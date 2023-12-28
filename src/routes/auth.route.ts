import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto, LoginUserDto, ResetPasswordDto, SendPasswordResetDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { Auth } from '@/middlewares/auth.middleware';

export class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, ValidationMiddleware(CreateUserDto), this.auth.signUp);
    this.router.post(`${this.path}/login`, ValidationMiddleware(LoginUserDto), this.auth.logIn);
    this.router.get(`${this.path}/verify-email/:token`, this.auth.verifyEmail);
    this.router.post(`${this.path}/send-email-verification`, Auth(), this.auth.sendEmailVerification);
    this.router.post(`${this.path}/send-password-reset`, ValidationMiddleware(SendPasswordResetDto), this.auth.sendPasswordReset);
    this.router.post(`${this.path}/reset-password/:token`, ValidationMiddleware(ResetPasswordDto), this.auth.resetPassword);

    // this.router.post(`${this.path}/logout`, AuthMiddleware, this.auth.logOut);
  }
}
