import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { Auth } from '@/middlewares/auth.middleware';
import { BannerController } from '@/controllers/banner.controller';
import { CreateBannerDto, GetBannerQueryDto, UpdateBannerDto } from '@/dtos/banner.dto';
import { UploadMiddleware } from '@/middlewares/upload.middleware';

export class BannerRoute implements Routes {
  public path = '/banners';
  public router = Router();
  public banner = new BannerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, ValidationMiddleware(GetBannerQueryDto, 'query'), this.banner.getBanners);
    this.router.get(`${this.path}/:id`, this.banner.getBanner);
    this.router.post(
      `${this.path}`,
      Auth(),
      UploadMiddleware.single('asset'),
      ValidationMiddleware(CreateBannerDto, 'body', true),
      this.banner.createBanner,
    );
    this.router.put(`${this.path}/:id`, Auth(), ValidationMiddleware(UpdateBannerDto, 'body', true), this.banner.updateBanner);
  }
}
