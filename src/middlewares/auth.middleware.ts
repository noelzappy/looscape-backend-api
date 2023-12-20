import passport from 'passport';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@interfaces/auth.interface';
import httpStatus from 'http-status';
import { roleRights } from '@/config/roles';

const verifyCallback = (req: RequestWithUser, resolve, reject, requiredRights: string[]) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new HttpException(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }

  req.user = user;

  if (requiredRights.length) {
    const userRights = roleRights.get(user.role);
    const hasRequiredRights = requiredRights.every(requiredRight => userRights.includes(requiredRight));

    if (!hasRequiredRights && req.params.userId !== user.id) {
      return reject(new HttpException(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }

  resolve();
};

export const Auth =
  (...requiredRights: string[]) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
      .then(() => next())
      .catch(err => next(err));
  };
