import { SECRET_KEY } from '@/config';
import { DataStoredInToken, TOKEN_TYPE, TokenInfo } from '@/interfaces/auth.interface';
import { User } from '@/interfaces/users.interface';
import { TokenModel } from '@/models/token.model';
import dayjs from 'dayjs';
import { sign } from 'jsonwebtoken';
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
}
