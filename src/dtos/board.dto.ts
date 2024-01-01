import { BoardStatus } from '@/interfaces/board.interface';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ObjectId } from 'mongoose';
import { GetQueryDto } from './misc.dto';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsNumber()
  @IsNotEmpty()
  public height: number;

  @IsNumber()
  @IsNotEmpty()
  public width: number;

  @IsString()
  @IsNotEmpty()
  public doubleSided: boolean;

  @IsString()
  @IsNotEmpty()
  public location: ObjectId;

  @IsNumber()
  @IsNotEmpty()
  public rate: number;
}

export class UpdateBoardDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsString()
  @IsNotEmpty()
  public height: number;

  @IsString()
  @IsNotEmpty()
  public width: number;

  @IsString()
  @IsNotEmpty()
  public doubleSided: boolean;

  @IsString()
  @IsNotEmpty()
  public location: string;

  @IsString()
  @IsOptional()
  public status: BoardStatus;

  @IsNumber()
  @IsNotEmpty()
  public rate: number;
}

export class CreateBoardLocationDto {
  @IsString()
  @IsNotEmpty()
  public country: string;

  @IsString()
  @IsNotEmpty()
  public city: string;

  @IsString()
  @IsNotEmpty()
  public address: string;

  @IsString()
  @IsNotEmpty()
  public postalCode: string;

  @IsNumber()
  @IsNotEmpty()
  public latitude: number;

  @IsNumber()
  @IsNotEmpty()
  public longitude: number;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public googlePlaceId: string;
}

export class GetBoardsDto extends GetQueryDto {
  @IsString()
  @IsOptional()
  public name: string;

  @IsString()
  @IsOptional()
  public status: BoardStatus;

  @IsString()
  @IsOptional()
  public height: number;

  @IsString()
  @IsOptional()
  public width: number;

  @IsString()
  @IsOptional()
  public doubleSided: boolean;
}
