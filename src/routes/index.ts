import { AuthRoute } from './auth.route';
import { UserRoute } from './users.route';

export const routes = [new UserRoute(), new AuthRoute()];
