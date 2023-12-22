import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { GetUsersDto, UpdateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { Auth } from '@/middlewares/auth.middleware';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, Auth('getUsers'), ValidationMiddleware(GetUsersDto, 'query', true), this.user.getUsers);
    this.router.get(`${this.path}/me`, Auth(), this.user.getMe);
    this.router.put(`${this.path}/me`, Auth(), ValidationMiddleware(UpdateUserDto, 'body', true), this.user.updateMe);

    // this.router.post(`${this.path}`, ValidationMiddleware(CreateUserDto), this.user.createUser);
    // this.router.put(`${this.path}/:id`, ValidationMiddleware(CreateUserDto, 'body', true), this.user.updateUser);
    // this.router.delete(`${this.path}/:id`, this.user.deleteUser);
  }
}
