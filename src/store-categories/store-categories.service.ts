import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateStoreCategoryDto } from './dto/create-store-category.dto';
import { UpdateStoreCategoryDto } from './dto/update-store-category.dto';

@Injectable()
export class StoreCategoriesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createStoreCategoryDto: CreateStoreCategoryDto) {
    const { name, description, stores } = createStoreCategoryDto;

    const data: Prisma.StoreCategoryCreateInput = {
      name,
      description,
      ...(stores?.length
        ? {
            stores: {
              connect: stores.map((store) => ({
                id: store.id,
              })),
            },
          }
        : {}),
    };

    try {
      return await this.databaseService.storeCategory.create({ data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Store category name already exists');
        }
      }
      throw error;
    }
  }

  async findAll(query: UpdateStoreCategoryDto) {
    const filters: Prisma.StoreCategoryWhereInput = {};

    if (query.name) {
      filters.name = { contains: query.name, mode: 'insensitive' };
    }

    const storeCategories = await this.databaseService.storeCategory.findMany({
      where: filters,
    });

    if (!storeCategories || storeCategories.length === 0) {
      throw new BadRequestException('Store categories not found');
    }

    return storeCategories;
  }

  async findOne(id: string) {
    return await this.databaseService.storeCategory.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateStoreCategoryDto: UpdateStoreCategoryDto) {
    const { name, description, stores } = updateStoreCategoryDto;

    const data: Prisma.StoreCategoryUpdateInput = {
      name,
      description,
      ...(stores?.length
        ? {
            stores: {
              connect: stores.map((store) => ({
                id: store.id,
              })),
            },
          }
        : {}),
    };

    try {
      return await this.databaseService.storeCategory.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Store category name already exists');
        }
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.databaseService.storeCategory.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException(
            'Store category is in use and cannot be deleted',
          );
        }
      }
      throw error;
    }
  }
}
