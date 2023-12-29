import { IsString, IsNotEmpty, IsOptional, IsNumber, IsInt } from 'class-validator';
import { ObjectId } from 'mongoose';
import { GetQueryDto } from './misc.dto';

export class CreateBannerDto {
  @IsString()
  @IsNotEmpty()
  public assetType: 'image' | 'video';

  @IsString()
  @IsNotEmpty()
  public assetUrl: string;

  @IsString()
  @IsNotEmpty()
  public board: string;

  @IsString()
  @IsNotEmpty()
  public startDate: Date;

  @IsString()
  @IsNotEmpty()
  public endDate: Date;

  @IsInt() // 15, 30, 45, 60 are the only valid values
  @IsNotEmpty()
  public duration: number;
}

export class UpdateBannerDto {
  @IsString()
  @IsOptional()
  public assetType: 'image' | 'video';

  @IsString()
  @IsOptional()
  public assetUrl: string;

  @IsString()
  @IsOptional()
  public board: string;

  @IsString()
  @IsOptional()
  public startDate: Date;

  @IsString()
  @IsOptional()
  public endDate: Date;

  @IsInt() // 15, 30, 45, 60 are the only valid values
  @IsOptional()
  public duration: number;
}

export class GetBannerQueryDto extends GetQueryDto {
  @IsOptional()
  public assetType: 'image' | 'video';

  @IsOptional()
  public board: string;

  @IsOptional()
  public startDate: Date;

  @IsOptional()
  public endDate: Date;

  @IsOptional()
  public duration: number;

  @IsString()
  @IsOptional()
  public status: string;
}
