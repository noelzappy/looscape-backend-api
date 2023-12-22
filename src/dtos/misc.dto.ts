import { IsInt, IsString, IsOptional } from 'class-validator';

export class GetQueryDto {
  @IsString()
  @IsOptional()
  public sortBy: string;

  @IsInt()
  @IsOptional()
  public limit: number;

  @IsInt()
  @IsOptional()
  public page: number;
}
