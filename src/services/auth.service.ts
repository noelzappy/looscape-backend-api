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

@Service()
export class AuthService {
  public tokenService = Container.get(TokenService);
  public userService = Container.get(UserService);

  public async signup(userData: User): Promise<{ token: TokenInfo; user: User }> {
    const findUser = await this.userService.findUserByEmail(userData.email, true);

    if (findUser) throw new HttpException(httpStatus.CONFLICT, `This email ${userData.email} already exists`);

    const createUserData: User = await this.userService.createUser(userData);

    const tokenData = await this.tokenService.createToken(createUserData, TOKEN_TYPE.AUTH);

    return { token: tokenData, user: createUserData };
  }

  public async login(userData: LoginUserDto): Promise<{ token: TokenInfo; user: User }> {
    const findUser: User = await this.userService.findUserByEmail(userData.email, true);
    if (!findUser) throw new HttpException(httpStatus.UNAUTHORIZED, 'Invalid email or password');

    const isPasswordMatching = await compare(userData.password, findUser.password);

    console.log(isPasswordMatching, userData.password, findUser.password);

    if (!isPasswordMatching) throw new HttpException(httpStatus.UNAUTHORIZED, 'Invalid email or password');

    const tokenData = await this.tokenService.createToken(findUser, TOKEN_TYPE.AUTH);

    return { token: tokenData, user: findUser };
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
