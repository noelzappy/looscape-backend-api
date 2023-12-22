import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
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

  @IsString()
  @IsNotEmpty()
  public latitude: number;

  @IsString()
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
