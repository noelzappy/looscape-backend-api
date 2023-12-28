import Container, { Service } from 'typedi';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@models/users.model';
import httpStatus from 'http-status';
import { compare } from 'bcrypt';
import { TOKEN_TYPE, TokenInfo } from '@/interfaces/auth.interface';
import { TokenService } from './token.service';
import { UserService } from './users.service';
import { LoginUserDto } from '@/dtos/users.dto';
import { EmailService } from './email.service';
import { TokenModel } from '@/models/token.model';

@Service()
export class AuthService {
  public tokenService = Container.get(TokenService);
  public userService = Container.get(UserService);
  public email = Container.get(EmailService);

  public async signup(userData: User): Promise<{ token: TokenInfo; user: User }> {
    const findUser = await this.userService.findUserByEmail(userData.email, true);

    if (findUser) throw new HttpException(httpStatus.CONFLICT, `This email ${userData.email} already exists`);

    const createUserData: User = await this.userService.createUser(userData);

    const tokenData = await this.tokenService.createToken(createUserData, TOKEN_TYPE.AUTH);

    this.sendEmailVerification(createUserData);

    return { token: tokenData, user: createUserData };
  }

  public async login(userData: LoginUserDto): Promise<{ token: TokenInfo; user: User }> {
    const findUser: User = await this.userService.findUserByEmail(userData.email, true);
    if (!findUser) throw new HttpException(httpStatus.UNAUTHORIZED, 'Invalid email or password');

    const isPasswordMatching = await compare(userData.password, findUser.password);

    if (!isPasswordMatching) throw new HttpException(httpStatus.UNAUTHORIZED, 'Invalid email or password');

    const tokenData = await this.tokenService.createToken(findUser, TOKEN_TYPE.AUTH);

    return { token: tokenData, user: findUser };
  }

  public async verifyEmail(token: string): Promise<User> {
    const { user }: any = await this.tokenService.verifyToken(token, TOKEN_TYPE.VERIFY_EMAIL);

    console.log('VERIFIED USER', user);

    if (!user) throw new HttpException(httpStatus.NOT_FOUND, 'Email could not be verified. Please try again.');

    const findUser = await UserModel.findById(user.id);

    if (!findUser) throw new HttpException(httpStatus.NOT_FOUND, 'Email could not be verified. Please try again.');

    Object.assign(findUser, { isEmailVerified: true });
    await findUser.save();

    return findUser;
  }

  public async sendEmailVerification(userData: User): Promise<void> {
    const findUser = await this.userService.findUserById(userData.id, true);

    if (!findUser) throw new HttpException(httpStatus.NOT_FOUND, 'User not found');

    await TokenModel.deleteMany({ user: findUser.id, type: TOKEN_TYPE.VERIFY_EMAIL });

    const tokenData = await this.tokenService.createToken(findUser, TOKEN_TYPE.VERIFY_EMAIL);

    await this.email.sendEmailVerificationEmail(findUser, tokenData.token);
  }

  public async sendPasswordReset(userEmail: string): Promise<void> {
    const findUser = await this.userService.findUserByEmail(userEmail, true);

    if (!findUser) throw new HttpException(httpStatus.NOT_FOUND, 'Could not initiate password reset. Please try again.');

    await TokenModel.deleteMany({ user: findUser.id, type: TOKEN_TYPE.RESET_PASSWORD });

    const tokenData = await this.tokenService.createToken(findUser, TOKEN_TYPE.RESET_PASSWORD);

    await this.email.sendPasswordResetEmail(findUser, tokenData.token);
  }

  public async resetPassword(token: string, newPassword: string): Promise<User> {
    const { user }: any = await this.tokenService.verifyToken(token, TOKEN_TYPE.RESET_PASSWORD);

    if (!user) throw new HttpException(httpStatus.NOT_FOUND, 'Password reset failed. Please try again.');

    const findUser = await UserModel.findById(user.id);

    if (!findUser) throw new HttpException(httpStatus.NOT_FOUND, 'Password reset failed. Please try again.');

    Object.assign(findUser, { password: newPassword });
    await findUser.save();

    return findUser;
  }

  /**
   *
   * @deprecated
   * @param userData
   * @returns
   */
  public async logout(userData: User): Promise<User> {
    const findUser: User = await UserModel.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    return findUser;
  }
}
