import { Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';
import catchAsync from '@/utils/catchAsync';
import httpStatus from 'http-status';
import { LoginUserDto } from '@/dtos/users.dto';

export class AuthController {
  public auth = Container.get(AuthService);

  public signUp = catchAsync(async (req: Request, res: Response) => {
    const userData: User = req.body;
    const signUpData = await this.auth.signup(userData);
    res.status(httpStatus.CREATED).send(signUpData);
  });

  public logIn = catchAsync(async (req: Request, res: Response) => {
    const userData: LoginUserDto = req.body;
    const authData = await this.auth.login(userData);
    res.status(httpStatus.OK).send(authData);
  });

  /**
   * @deprecated
   **/
  public logOut = catchAsync(async (req: RequestWithUser, res: Response) => {
    const userData: User = req.user;
    const logOutUserData: User = await this.auth.logout(userData);
    return res.status(httpStatus.OK).send(logOutUserData);
  });
}
