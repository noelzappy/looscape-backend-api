import { Request, Response } from 'express';
import { Container } from 'typedi';
import httpStatus from 'http-status';
import { RequestWithUser } from '@/interfaces/auth.interface';
import catchAsync from '@/utils/catchAsync';
import _ from 'lodash';
import { User } from '@interfaces/users.interface';
import { UserService } from '@services/users.service';

export class UserController {
  public user = Container.get(UserService);

  public getUsers = catchAsync(async (req: Request, res: Response) => {
    const filter = _.pick(req.query, ['name', 'email', 'role']);
    const options = _.pick(req.query, ['sortBy', 'limit', 'page']);

    const queryUsersData = await this.user.queryUsers(filter, options);

    res.status(httpStatus.OK).json(queryUsersData);
  });

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
