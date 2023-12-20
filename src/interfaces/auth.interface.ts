import { Request } from 'express';
import { User } from '@interfaces/users.interface';

export enum TOKEN_TYPE {
  VERIFY_EMAIL = 'verify_email',
  RESET_PASSWORD = 'reset_password',
}

export interface DataStoredInToken {
  _id: string;
  tokenType: TOKEN_TYPE;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
