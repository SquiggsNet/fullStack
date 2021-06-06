import { Expense } from "../entities/Expense";
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
class ExpenseInput {
  @Field()
  name: string;
  @Field()
  description?: string;
  @Field()
  value: number;
  @Field()
  frequency: string;
}

@Resolver(Expense)
export class ExpenseResolver {
  @Query(() => Expense, { nullable: true })
  async expense(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<Expense | undefined> {
    if (!req.session.userId) {
      return undefined;
    }
    const profileId = await getProfileByUserId(req.session.userId);
    const expense = await Expense.findOne(id);
    return expense?.profileId === profileId ? expense : undefined;
  }

  @Mutation(() => Expense)
  @UseMiddleware(isAuth)
  async createExpense(
    @Arg("options") options: ExpenseInput,
    @Ctx() { req }: MyContext
  ): Promise<Expense | null> {
    if (!req.session.userId) {
      return null;
    }
    const profileId = await getProfileByUserId(req.session.userId);
    const expense = await Expense.create({ ...options, profileId }).save();
    return expense;
  }

  @Mutation(() => Expense, { nullable: true })
  @UseMiddleware(isAuth)
  async updateExpense(
    @Arg("id", () => Int) id: number,
    @Arg("name", () => String, { nullable: true }) name: string,
    @Arg("description", () => String, { nullable: true }) description: string,
    @Arg("value", () => Number, { nullable: true }) value: number,
    @Arg("frequency", () => String, { nullable: true }) frequency: string,
    @Ctx() { req }: MyContext
  ): Promise<Expense | null> {
    if (!req.session.userId) {
      return null;
    }
    const profileId = await getProfileByUserId(req.session.userId);

    const result = await getConnection()
      .createQueryBuilder()
      .update(Expense)
      .set({ name, description, value, frequency })
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
  async deleteExpense(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    if (!req.session.userId) {
      return false;
    }
    const profileId = await getProfileByUserId(req.session.userId);
    await Expense.delete({ id, profileId });

    return true;
  }
}