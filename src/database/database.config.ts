import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DATABASE } from '@config';

const dbConfig: ConnectionOptions = {
  type: 'postgres',
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  port: +POSTGRES_PORT,
  database: POSTGRES_DATABASE,
  // For dev purposes only if it was a real app we would use migrations
  synchronize: true,
  logging: false,
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../**/migrations/*{.ts,.js}')],
  subscribers: [join(__dirname, '../**/*.subscriber{.ts,.js}')],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'src/subscriber',
  },
};

export default dbConfig;
