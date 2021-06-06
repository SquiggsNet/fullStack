import DataLoader from "dataloader";
import { Expense } from "../entities/Expense";

export const createExpenseLoader = () =>
  new DataLoader<number, Expense>(async (expenseIds) => {
    const expenses = await Expense.findByIds(expenseIds as number[]);
    const expenseIdToExpense: Record<number, Expense> = {};
    expenses.forEach((a) => {
      expenseIdToExpense[a.id] = a;
    });
    return expenseIds.map((expenseId) => expenseIdToExpense[expenseId]);
  });
