import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { User } from '@interfaces/users.interface';
import { UserService } from '@services/users.service';
import catchAsync from '@/utils/catchAsync';
import { RequestWithUser } from '@/interfaces/auth.interface';
import httpStatus from 'http-status';

export class UserController {
  public user = Container.get(UserService);

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.user.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getMe = catchAsync(async (req: RequestWithUser, res: Response) => {
    const user = await this.user.findUserById(req.user.id);
    res.status(httpStatus.OK).send(user);
  });

  public updateMe = catchAsync(async (req: RequestWithUser, res: Response) => {
    const user = req.user;
    const userData: User = req.body;
    const updateUserData = await this.user.updateUser(user._id, userData);

    res.status(httpStatus.OK).send(updateUserData);
  });
}
