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
import { S3Client } from '@/config/s3config';
import { DO_SPACES_BUCKET } from '@/config';
import { BoardService } from '@/services/board.service';

export class BannerController {
  public banner = Container.get(BannerService);
  public board = Container.get(BoardService);

  public createBanner = catchAsync(async (req: RequestWithFileAndUser, res: Response) => {
    const isBoardAvailable = await this.board.isBoardAvailable(req.body.board, req.body.startDate, req.body.endDate);

    if (!isBoardAvailable) {
      throw new HttpException(httpStatus.BAD_REQUEST, 'This billboard is not available for the specified date range');
    }

    const bannerPrice = await this.banner.determineBannerPrice(_.pick(req.body, ['duration', 'board', 'startDate', 'endDate']));

    const bannerData: CreateBannerDto = {
      ...req.body,
      user: req.user.id,
      status: BannerStatus.AWAITING_PAYMENT,
    };

    bannerData['price'] = bannerPrice;

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

  public uploadAsset = catchAsync(async (req: RequestWithFileAndUser, res: Response) => {
    if (!req.file) {
      throw new HttpException(httpStatus.BAD_REQUEST, 'Asset is required');
    }
    res.status(httpStatus.CREATED).send(req.file);
  });

  public deleteAsset = catchAsync(async (req: RequestWithUser, res: Response) => {
    const { assetUrl, key } = req.body;

    if (!assetUrl || !key) {
      throw new HttpException(httpStatus.BAD_REQUEST, 'Asset url or asset key are required');
    }
    const objectKey = assetUrl ? assetUrl.split('/').pop() : key;

    await S3Client.deleteObject({
      Bucket: DO_SPACES_BUCKET,
      Key: objectKey,
    });

    res.status(httpStatus.NO_CONTENT).send();
  });
}
