import { createConnection } from 'typeorm';

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    database: 'sqn-db',
    username: 'postgres',
    password: 'postgres',
    logging: true,
    synchronize: true,
    entities: []
  })


}

main();