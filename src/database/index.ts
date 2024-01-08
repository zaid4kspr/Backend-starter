import { createConnection } from 'typeorm';
import dbConfig from './database.config';

export const dbConnection = async () => {
  await createConnection(dbConfig);
};
