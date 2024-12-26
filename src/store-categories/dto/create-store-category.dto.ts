import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateStoreCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  stores?: { id: string }[];
}
