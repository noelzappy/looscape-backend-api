import { RequestWithUser } from '@/interfaces/auth.interface';
import { NextFunction, Request, Response } from 'express';

const catchAsync =
  (fn: (req: Request | RequestWithUser, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request | RequestWithUser, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(err => next(err));
  };

export default catchAsync;
