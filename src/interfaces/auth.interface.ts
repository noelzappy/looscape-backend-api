import { Request } from 'express';
import { User } from '@interfaces/users.interface';

export enum TOKEN_TYPE {
  VERIFY_EMAIL = 'verify_email',
  RESET_PASSWORD = 'reset_password',
  AUTH = 'auth',
}

export interface DataStoredInToken {
  userId: string;
  tokenType: TOKEN_TYPE;
}

export interface TokenData {
  token: string;
  user: string;
  type: TOKEN_TYPE;
  id?: string;
  _id?: string;
}

export interface TokenInfo {
  expiresAt: number;
  token: string;
}

export interface RequestWithUser extends Request {
  user: User;
}
