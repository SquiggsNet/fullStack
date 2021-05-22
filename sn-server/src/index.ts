import "reflect-metadata";
import express from 'express';
// import { createConnection } from 'typeorm';
// import { FinancialAsset } from './entities/FinancialAsset';
// import { FinancialExpense } from './entities/FinancialExpense';
// import { FinancialIncome } from './entities/FinancialIncome';
// import { FinancialLiability } from './entities/FinancialLiability';
// import { FinancialProfile } from './entities/FinancialProfile';
// import { Post } from './entities/Post';
// import { Updoot } from './entities/Updoot';
// import { User } from './entities/User';

const main = async () => {
  // const conn = await createConnection({
  //   type: 'postgres',
  //   database: 'sqn-db',
  //   username: 'postgres',
  //   password: 'postgres',
  //   logging: true,
  //   synchronize: true,
  //   entities: [
  //     FinancialAsset,
  //     FinancialExpense,
  //     FinancialIncome,
  //     FinancialLiability,
  //     FinancialProfile,
  //     Post,
  //     Updoot,
  //     User,
  //   ]
  // })
  // const options = {
  //   username: "squiggs",
  //   email: "squiggs.rafael@gmail.com",
  //   password: "squiggs",
  // };
  // const hashedPassword = options.password;
  // let user;
  // const result = await conn.createQueryBuilder()
  //   .insert()
  //   .into(User)
  //   .values({
  //     username: options.username,
  //     email: options.email,
  //     password: hashedPassword,
  //   })
  //   .returning("*")
  //   .execute();
  // user = result.raw[0];
  // console.log(user)

  const app = express();
  app.get('/', (_, res) => {
    res.send("hello");
  });

  const port = 4000;
  app.listen(port, () => {
    console.log(`sn-server started: listening on ${port}`);
  })
}

main();