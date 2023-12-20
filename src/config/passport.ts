import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { SECRET_KEY } from '.';
import { DataStoredInToken, TOKEN_TYPE } from '@/interfaces/auth.interface';
import { UserModel } from '@/models/users.model';
import { HttpException } from '@/exceptions/HttpException';
import httpStatus from 'http-status';

const jwtOptions = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

export const jwtVerify = async (payload: DataStoredInToken, done) => {
  try {
    if (payload.tokenType !== TOKEN_TYPE.AUTH) {
      throw new HttpException(httpStatus.UNAUTHORIZED, 'Invalid token');
    }

    const user = await UserModel.findById(payload.userId);

    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export default jwtStrategy;
