import { IBoard } from './board.interface';
import { User } from './users.interface';

export enum BannerStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  INACTIVE = 'INACTIVE',
  ENDED = 'ENDED',
  AWAITING_PAYMENT = 'AWAITING_PAYMENT',
  AWAITING_APPROVAL = 'AWAITING_APPROVAL',
}

export interface IBanner {
  id?: string;
  _id?: string;
  assetType: 'image' | 'video';
  assetUrl: string;
  price: number;
  board: string | IBoard;
  startDate: Date;
  endDate: Date;
  user?: string | User;
  assetLength: number;
  status: BannerStatus;
  duration: number; // 15, 30, 45, 60
}
