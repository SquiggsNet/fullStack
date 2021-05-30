import { User } from "../entities/User";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import argon2 from "argon2";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { UsernamePasswordInput } from "./UsernamePasswordInput";
import { validatePassowrd, validateRegister } from "../utils/validateRegister";
// import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";
import { getConnection } from "typeorm";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

const invalidLoginResponseErrors = [
  {
    field: "usernameOrEmail",
    message: "username or password is incorrect",
  },
  {
    field: "password",
    message: "username or password is incorrect",
  },
];

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    const currentUser = req.session.userId === user.id;
    if (currentUser) {
      return user.email;
    }
    // fallback if not current user
    return "";
  }
  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { req, redis }: MyContext
  ): Promise<UserResponse> {
    const errors = validatePassowrd(newPassword, "newPassword");
    if (errors) {
      return { errors };
    }
    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);
    console.log(`forgotpass userId: ${userId}`);
    if (!userId) {
      return {
        errors: [
          { field: "token", message: "token expired. request new reset link" },
        ],
      };
    }
    const id = parseInt(userId);
    let user = await User.findOne(id);
    if (!user) {
      return { errors: [{ field: "token", message: "user no longer exists" }] };
    }
    try {
      const hashedPassword = await argon2.hash(newPassword);
      await User.update(
        { id },
        {
          password: hashedPassword,
        }
      );
    } catch (error) {
      return { errors: [{ field: "token", message: "user update error" }] };
    }

    await redis.del(key);

    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return true;
    }
    const token = v4();
    console.log(`forgotpass email userId: ${user.id}`);
    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 15 // 15 min expiry
    );
    // TODO: generate email template
    const userId = await redis.get(FORGET_PASSWORD_PREFIX + token);
    console.log(`forgotpass redis userId: ${userId}`);
    // const body = `<a href="${process.env.CORS_ORIGIN}/change-password/${token}">reset password</a>`;
    // sendEmail(email, "Password Recovery - TheSquiggsNet", body);
    return true;
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }
    return User.findOne(req.session.userId);
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }
    const hashedPassword = await argon2.hash(options.password);
    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: options.username,
          email: options.email,
          password: hashedPassword,
        })
        .returning("*")
        .execute();
      user = result.raw[0];
    } catch (error) {
      if (error.code === "23505") {
        if (error.detail.includes('username')) {
          return {
            errors: [
              {
                field: "username",
                message: "username already exists",
              }
            ],
          };
        }
        else if (error.detail.includes("email")) {
          return {
            errors: [
              {
                field: "email",
                message: "email already exists",
              },
            ],
          };
        } else {
          return {
            errors: [
              {
                field: "username",
                message: "username or email already exists",
              },
              {
                field: "email",
                message: "username or email already exists",
              },
            ],
          };
        }
      }
    }

    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({
      where: usernameOrEmail.includes("@")
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail },
    });

    if (!user) {
      return {
        errors: invalidLoginResponseErrors,
      };
    }

    const valid = argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: invalidLoginResponseErrors,
      };
    }

    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }
}
