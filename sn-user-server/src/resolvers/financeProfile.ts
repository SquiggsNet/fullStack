import { 
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { FinanceProfile } from "../entities/FinanceProfile";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { Account } from "../entities/Account";
import { Expense } from "../entities/Expense";

export const getProfileByUserId = async (userId: number) => {
  const profiles = await getConnection().query(
    `
  SELECT p.id
  FROM finance_profile p
  WHERE p."userId" = $1
  ORDER BY p."createdAt" DESC
  limit 1
  `,
    [userId]
  );
  return profiles[0].id;
};

@Resolver(FinanceProfile)
export class FinanceProfileResolver {
  @FieldResolver(() => [Account], { nullable: true })
  async accounts(
    @Root() financeProfile: FinanceProfile,
    @Ctx() { accountLoader, req }: MyContext
  ) {
    if (!req.session.userId) {
      return null;
    }
    const accountsIds = await getConnection().query(
      `
      SELECT a.id
      FROM account a
      WHERE a."profileId" = $1
      `,
      [financeProfile.id]
    );
    const aIds = accountsIds.map((r: any) => r.id);
    const accounts: Account[] = [];
    for (const id of aIds) {
      accounts.push(await accountLoader.load(id));
    }
    return accounts ? accounts : null;
  }

  @FieldResolver(() => [Expense], { nullable: true })
  async expenses(
    @Root() financeProfile: FinanceProfile,
    @Ctx() { expenseLoader, req }: MyContext
  ) {
    if (!req.session.userId) {
      return null;
    }
    const expensesIds = await getConnection().query(
      `
      SELECT e.id
      FROM expense e
      WHERE e."profileId" = $1
      `,
      [financeProfile.id]
    );
    const eIds = expensesIds.map((r: any) => r.id);
    const expenses: Expense[] = [];
    for (const id of eIds) {
      expenses.push(await expenseLoader.load(id));
    }
    return expenses ? expenses : null;
  }

  @Mutation(() => FinanceProfile)
  @UseMiddleware(isAuth)
  async createFinanceProfile(
    @Ctx() { req }: MyContext
  ): Promise<FinanceProfile> {
    const profile = await FinanceProfile.create({
      userId: req.session.userId,
    }).save();
    return profile;
  }

  @Query(() => [FinanceProfile], { nullable: true })
  async myFinances(@Ctx() { req }: MyContext): Promise<FinanceProfile[]> {
    if (!req.session.userId) {
      return [];
    }
    return await getConnection().query(
      `
    SELECT p.*
    FROM finance_profile p
    WHERE p."userId" = $1
    ORDER BY p."createdAt" DESC
    limit 1
    `,
      [req.session.userId]
    );
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteFinanceProfile(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    await FinanceProfile.delete({ id, userId: req.session.userId });
    return true;
  }
}
