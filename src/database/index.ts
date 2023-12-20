import { connect, set } from 'mongoose';
import { NODE_ENV, DB_URL } from '@config';

export const dbConnection = async () => {
  const dbConfig = {
    url: `${DB_URL}`,
    options: {},
  };

  if (NODE_ENV !== 'production') {
    set('debug', true);
  }

  await connect(dbConfig.url, dbConfig.options);
};
