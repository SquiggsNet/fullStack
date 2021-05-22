import express from 'express';
import { createConnection } from 'typeorm';

const main = async () => {
    await createConnection({
    type: 'postgres',
    database: 'sqn-db',
    username: 'postgres',
    password: 'postgres',
    logging: true,
    synchronize: true,
    entities: []
  })

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