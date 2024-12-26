import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  ownerId: string;

  @IsString()
  storeCategoryId: string;

  @IsOptional()
  @IsArray()
  products?: { id: string }[];
}
