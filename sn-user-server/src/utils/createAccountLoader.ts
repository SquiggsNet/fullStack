import DataLoader from "dataloader";
import { Account } from "../entities/Account";

export const createAccountLoader = () =>
  new DataLoader<number, Account>(async (accountIds) => {
    const accounts = await Account.findByIds(accountIds as number[]);
    const accountIdToAccount: Record<number, Account> = {};
    accounts.forEach((a) => {
      accountIdToAccount[a.id] = a;
    });
    return accountIds.map((accountId) => accountIdToAccount[accountId]);
  });
