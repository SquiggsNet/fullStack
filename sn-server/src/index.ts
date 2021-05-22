import express from 'express';

const main = async () => {
  const app = express();
  app.get('/', (_, res) => {
    res.send("hello");
  });
  const port = 4000;
  app.listen(port, () => {
    console.log(`sn-server started: listening on ${port}`);
  })
}

main()