export enum ROLE {
  USER = 'user',
  ADMIN = 'admin',
}

export interface User {
  _id?: any;
  id?: any;
  email: string;
  password: string;
  name: string;
  role: ROLE;
  avatar?: string;
  phoneNumber?: string;
  company?: string;
  country?: string;
  isEmailVerified: boolean;
}
