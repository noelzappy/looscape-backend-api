import { Service } from 'typedi';
import { HttpException } from '@exceptions/HttpException';
import httpStatus from 'http-status';
import BannerModel from '@/models/banner.model';
import { PaginatedData, QueryFilter } from '@/interfaces/misc.interface';
import { IBanner } from '@/interfaces/banner.interface';
import { CreateBannerDto, UpdateBannerDto } from '@/dtos/banner.dto';

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
}
