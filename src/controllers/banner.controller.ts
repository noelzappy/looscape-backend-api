import { Request, Response } from 'express';
import { Container } from 'typedi';
import httpStatus from 'http-status';
import { RequestWithFileAndUser, RequestWithUser } from '@/interfaces/auth.interface';
import catchAsync from '@/utils/catchAsync';
import _ from 'lodash';
import BannerService from '@/services/banner.service';
import { CreateBannerDto, UpdateBannerDto } from '@/dtos/banner.dto';
import { BannerStatus } from '@/interfaces/banner.interface';
import { HttpException } from '@/exceptions/HttpException';

export class BannerController {
  public banner = Container.get(BannerService);

  public createBanner = catchAsync(async (req: RequestWithFileAndUser, res: Response) => {
    if (!req.file) {
      throw new HttpException(httpStatus.BAD_REQUEST, 'Asset is required');
    }

    const bannerData: CreateBannerDto = {
      ...req.body,
      user: req.user.id,
      status: BannerStatus.PENDING,
      assetUrl: req.file.location,
      price: 10, // TODO: calculate price
    };

    console.log(bannerData);

    const createBannerData = await this.banner.createBanner(bannerData);

    res.status(httpStatus.CREATED).send(createBannerData);
  });

  public getBanners = catchAsync(async (req: Request, res: Response) => {
    const filter = _.pick(req.query, ['assetType', 'status', 'duration', 'board']);
    const options = _.pick(req.query, ['sortBy', 'limit', 'page']);

    const queryBannersData = await this.banner.queryBanners(filter, options);

    res.status(httpStatus.OK).send(queryBannersData);
  });

  public getBanner = catchAsync(async (req: Request, res: Response) => {
    const banner = await this.banner.findBannerById(req.params.id);
    res.status(httpStatus.OK).send(banner);
  });

  public updateBanner = catchAsync(async (req: RequestWithUser, res: Response) => {
    const bannerId: string = req.params.id;
    const bannerData: UpdateBannerDto = req.body;
    const updateBannerData = await this.banner.updateBanner(bannerId, bannerData);

    res.status(httpStatus.OK).send(updateBannerData);
  });
}
