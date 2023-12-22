import { IsEmail, IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { GetQueryDto } from './misc.dto';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  public password: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsOptional()
  public role = 'user';

  @IsString()
  @IsOptional()
  public avatar: string;

  @IsString()
  @IsOptional()
  public phoneNumber: string;

  @IsString()
  @IsOptional()
  public company: string;

  @IsString()
  @IsOptional()
  public country: string;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsOptional()
  public avatar: string;

  @IsString()
  @IsOptional()
  public phoneNumber: string;

  @IsString()
  @IsOptional()
  public company: string;

  @IsString()
  @IsOptional()
  public country: string;
}

export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}

export class GetUsersDto extends GetQueryDto {
  @IsString()
  @IsOptional()
  public name: string;

  @IsEmail()
  @IsOptional()
  public email: string;

  @IsString()
  @IsOptional()
  public role: string;
}
