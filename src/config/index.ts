import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
export const { DB_URL } = process.env;
export const { MAIL_HOST, MAIL_PORT, MAIL_FROM, MAIL_USER, MAIL_PASSWORD, CLIENT_URL } = process.env;

export enum DB_COLLECTIONS {
  USER = 'User',
  TOKEN = 'Token',
  BOARD = 'Board',
  BOARD_LOCATION = 'BoardLocation',
}
