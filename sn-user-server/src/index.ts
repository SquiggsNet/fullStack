require("dotenv").config();
import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import { Post } from "./entities/Post";
import { Updoot } from "./entities/Updoot";
import { User } from "./entities/User";

const main = async () => {
  const { DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST } =
    process.env;
  await createConnection({
    type: "postgres",
    host: DB_HOST,
    port: DB_PORT ? +DB_PORT : undefined,
    database: DB_DATABASE,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    logging: true,
    // synchronize: true,
    entities: [Post, Updoot, User],
  });

  const app = express();
  app.get("/", (_, res) => {
    res.send("hello");
  });

  app.listen(process.env.PORT, () => {
    console.log(`sn-user-server started: listening on ${process.env.PORT}`);
  });
};

main();
