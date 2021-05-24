require("dotenv").config();
import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import { Post } from "./entities/Post";
import { Upvote } from "./entities/Upvote";
import { User } from "./entities/User";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { createUpvoteLoader } from "./utils/createUpvoteLoader";
import { createUserLoader } from "./utils/createUserLoader";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { COOKIE_NAME, __prod__ } from "./constants";

const main = async () => {
  const { DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST } =
    process.env;
  // Initialize DB
  let retries = 5;
  while (retries) {
    try {
      await createConnection({
        type: "postgres",
        host: DB_HOST,
        port: DB_PORT ? +DB_PORT : undefined,
        database: DB_DATABASE,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        logging: true,
        // synchronize: true,
        entities: [Post, Upvote, User],
      });
      break;
    } catch (error) {
      console.log(error);
      retries -= 1;
      console.log(`db connect retries left: ${retries}`);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }

  // Create App
  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.set("trust proxy", 1);
  // CORS
  app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

  // Redis for session authentication
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1yr
        httpOnly: true,
        sameSite: "lax", // csrf (Squiggs: read more)
        secure: __prod__, // cookie only works in https (if !https in prod, turn off)
        domain: __prod__ ? ".squiggs.net" : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET ? process.env.SESSION_SECRET : "",
      resave: false,
    })
  );

  // Graphql endpoint
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
      upvoteLoader: createUpvoteLoader(),
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  // Sever Started
  const port = process.env.PORT ? parseInt(process.env.PORT) : 4000
  app.listen(port, () => {
    console.log(`sn-user-server started: listening on ${port}`);
  });
};

main();
