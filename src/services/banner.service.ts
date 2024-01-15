import { Service } from 'typedi';
import { HttpException } from '@exceptions/HttpException';
import httpStatus from 'http-status';
import BannerModel from '@/models/banner.model';
import { PaginatedData, QueryFilter } from '@/interfaces/misc.interface';
import { BannerPriceParams, IBanner } from '@/interfaces/banner.interface';
import { CreateBannerDto, UpdateBannerDto } from '@/dtos/banner.dto';
import BoardModel from '@/models/board.model';
import { getVideoDuration } from '@/utils/misc';

@Service()
export default class BannerService {
  public async queryBanners(filter: QueryFilter, options: any): Promise<PaginatedData<IBanner>> {
    const banners = await BannerModel.paginate(filter, options);
    return banners;
  }

  public async findBannerById(bannerId: string, skipCheckExist = false): Promise<IBanner> {
    const banner = await BannerModel.findById(bannerId);
    if (!banner && !skipCheckExist) {
      throw new HttpException(httpStatus.NOT_FOUND, 'Banner not found');
    }
    return banner;
  }

  public async createBanner(bannerData: CreateBannerDto): Promise<IBanner> {
    const banner = await BannerModel.create(bannerData);
    return banner;
  }

  public async updateBanner(bannerId: string, bannerData: UpdateBannerDto, checkStatus = true): Promise<IBanner> {
    const banner = await BannerModel.findById(bannerId);
    if (!banner) {
      throw new HttpException(httpStatus.NOT_FOUND, 'Banner not found');
    }

    if (checkStatus && banner.status !== 'PENDING') {
      throw new HttpException(httpStatus.BAD_REQUEST, 'Banner cannot be updated. It is already being displayed.');
    }

    Object.assign(banner, bannerData);

    await banner.save();

    return banner;
  }

  public async calculateBlipCount(bannerParam: BannerPriceParams): Promise<number> {
    const { assetType, assetUrl, blipCount } = bannerParam;
    if (assetType === 'image') {
      return blipCount || 1;
    }

    if (assetType === 'video') {
      const videoDuration = await getVideoDuration(assetUrl);

      return videoDuration;
    }

    return 0;
  }

  public async determineBannerPrice(bannerParam: BannerPriceParams): Promise<number> {
    const { board, startDate, endDate } = bannerParam;

    // TODO: Implement logic to determine price based on duration, board, startDate and endDate

    const billBoard = await BoardModel.findById(board);

    if (!billBoard) {
      throw new HttpException(httpStatus.NOT_FOUND, 'The selected board does not exist');
    }

    const { rate } = billBoard;

    const blipCount = await this.calculateBlipCount(bannerParam);

    return rate * blipCount;
  }
}
