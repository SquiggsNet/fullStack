import { Request, Response } from "express";
import { Session } from "express-session";
import { Redis } from "ioredis";
import { createAccountLoader } from "./utils/createAccountLoader";
import { createExpenseLoader } from "./utils/createExpenseLoader";
import { createUpvoteLoader } from "./utils/createUpvoteLoader";
import { createUserLoader } from "./utils/createUserLoader";

export type MyContext = {
  req: Request & { session?: Session & { userId?: number } };
  res: Response;
  redis: Redis;
  userLoader: ReturnType<typeof createUserLoader>;
  upvoteLoader: ReturnType<typeof createUpvoteLoader>;
  accountLoader: ReturnType<typeof createAccountLoader>;
  expenseLoader: ReturnType<typeof createExpenseLoader>;
};
