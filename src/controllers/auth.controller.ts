import { Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';
import catchAsync from '@/utils/catchAsync';
import httpStatus from 'http-status';
import { LoginUserDto, ResetPasswordDto } from '@/dtos/users.dto';
import { HttpException } from '@/exceptions/HttpException';

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

  public verifyEmail = catchAsync(async (req: Request, res: Response) => {
    const { token } = req.params;
    await this.auth.verifyEmail(token);
    return res.status(httpStatus.NO_CONTENT).send();
  });

  public sendEmailVerification = catchAsync(async (req: RequestWithUser, res: Response) => {
    const userData: User = req.user;
    await this.auth.sendEmailVerification(userData);
    return res.status(httpStatus.NO_CONTENT).send();
  });

  public sendPasswordReset = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body;
    await this.auth.sendPasswordReset(email);
    return res.status(httpStatus.NO_CONTENT).send();
  });

  public resetPassword = catchAsync(async (req: Request, res: Response) => {
    const { token } = req.params;
    const { password, confirmPassword }: ResetPasswordDto = req.body;

    if (password !== confirmPassword) throw new HttpException(httpStatus.BAD_REQUEST, 'Passwords do not match');

    await this.auth.resetPassword(token, password);
    return res.status(httpStatus.NO_CONTENT).send();
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
