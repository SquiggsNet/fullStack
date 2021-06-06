import { Account } from "../entities/Account";
import {
  Arg,
  Ctx,
  Field,
  Int,
  InputType,
  Mutation,
  Resolver,
  UseMiddleware,
  Query,
} from "type-graphql";
import { getConnection } from "typeorm";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { getProfileByUserId } from "./financeProfile";

@InputType()
class AccountInput {
  @Field()
  name: string;
  @Field()
  description?: string;
  @Field()
  balance: number;
  @Field()
  balanceDate: Date;
  @Field()
  isCredit: boolean;
}

@Resolver(Account)
export class AccountResolver {
  @Query(() => Account, { nullable: true })
  async account(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<Account | undefined> {
    if (!req.session.userId) {
      return undefined;
    }
    const profileId = await getProfileByUserId(req.session.userId);
    const account  = await Account.findOne(id);
    return account?.profileId === profileId ? account : undefined;
  }

  @Mutation(() => Account)
  @UseMiddleware(isAuth)
  async createAccount(
    @Arg("options") options: AccountInput,
    @Ctx() { req }: MyContext
  ): Promise<Account | null> {
    if (!req.session.userId) {
      return null;
    }
    const profileId = await getProfileByUserId(req.session.userId);
    const account = await Account.create({ ...options, profileId }).save();
    return account;
  }

  @Mutation(() => Account, { nullable: true })
  @UseMiddleware(isAuth)
  async updateAccount(
    @Arg("id", () => Int) id: number,
    @Arg("name", () => String, { nullable: true }) name: string,
    @Arg("description", () => String, { nullable: true }) description: string,
    @Arg("balance", () => Number, { nullable: true }) balance: number,
    @Arg("balanceDate", () => Date, { nullable: true }) balanceDate: Date,
    @Arg("isCredit", () => Boolean, { nullable: true }) isCredit: boolean,
    @Ctx() { req }: MyContext
  ): Promise<Account | null> {
    if (!req.session.userId) {
      return null;
    }
    const profileId = await getProfileByUserId(req.session.userId);

    const result = await getConnection()
      .createQueryBuilder()
      .update(Account)
      .set({ name, description, balance, balanceDate, isCredit })
      .where('id = :id and "profileId" = :profileId', {
        id,
        profileId,
      })
      .returning("*")
      .execute();
    return result.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteAccount(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    if (!req.session.userId) {
      return false;
    }
    const profileId = await getProfileByUserId(req.session.userId);
    await Account.delete({ id, profileId });

    return true;
  }
}