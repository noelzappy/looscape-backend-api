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
    this.router.post(`${this.path}/upload`, Auth(), UploadMiddleware.single('asset'), this.banner.uploadAsset);
    this.router.delete(`${this.path}/upload`, Auth(), this.banner.deleteAsset);

    this.router.post(`${this.path}`, Auth(), ValidationMiddleware(CreateBannerDto), this.banner.createBanner);
    this.router.get(`${this.path}/:id`, this.banner.getBanner);
    this.router.put(`${this.path}/:id`, Auth(), ValidationMiddleware(UpdateBannerDto, 'body', true), this.banner.updateBanner);
  }
}
