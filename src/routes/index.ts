import { AuthRoute } from './auth.route';
import { BoardRoute } from './board.route';
import { UserRoute } from './users.route';

export const routes = [new UserRoute(), new AuthRoute(), new BoardRoute()];
