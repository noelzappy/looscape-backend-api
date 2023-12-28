import { SECRET_KEY } from '@/config';
import { HttpException } from '@/exceptions/HttpException';
import { DataStoredInToken, TOKEN_TYPE, TokenData, TokenInfo } from '@/interfaces/auth.interface';
import { User } from '@/interfaces/users.interface';
import { TokenModel } from '@/models/token.model';
import dayjs from 'dayjs';
import httpStatus from 'http-status';
import { decode, sign } from 'jsonwebtoken';
import { Service } from 'typedi';

@Service()
export class TokenService {
  public async createToken(user: User, tokenType: TOKEN_TYPE): Promise<TokenInfo> {
    const dataStoredInToken: DataStoredInToken = {
      userId: user.id,
      tokenType,
    };

    const expiresIn = dayjs().add(1, 'day').unix(); // Update to use config from ENV

    if (tokenType !== TOKEN_TYPE.AUTH) {
      await TokenModel.deleteMany({ user: user.id, type: tokenType });

      const newToken = await TokenModel.create({
        user: user.id,
        type: tokenType,
        token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }),
      });

      return { expiresAt: expiresIn, token: newToken.token };
    }

    return { expiresAt: expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
  }

  public async verifyToken(token: string, tokenType: TOKEN_TYPE, deleteAfterVerify = true): Promise<TokenData> {
    const tokenData: TokenData = await TokenModel.findOne({ token, type: tokenType }).populate('user');

    if (!tokenData) throw new HttpException(httpStatus.UNAUTHORIZED, 'Verification token is invalid');

    const dataInToken: any = decode(tokenData.token) as DataStoredInToken;

    // Check if token is expired
    if (dayjs().isAfter(dayjs.unix(dataInToken.exp))) throw new HttpException(httpStatus.UNAUTHORIZED, 'Verification token is expired');

    if (dataInToken.tokenType !== tokenType) throw new HttpException(httpStatus.UNAUTHORIZED, 'Verification token is invalid');

    if (deleteAfterVerify) await TokenModel.findByIdAndDelete(tokenData.id);

    return tokenData;
  }
}
