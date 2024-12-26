import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { StoreCategoriesService } from 'src/store-categories/store-categories.service';
import { UsersService } from 'src/users/users.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoresService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly usersService: UsersService,
    private readonly storeCategoriesService: StoreCategoriesService,
  ) {}

  async create(createStoreDto: CreateStoreDto) {
    const { name, description, ownerId, storeCategoryId, products } =
      createStoreDto;

    const ownerExists = await this.usersService.findOne(ownerId);

    if (!ownerExists) {
      throw new NotFoundException('Owner not found');
    }

    const storeCategoryExists =
      await this.storeCategoriesService.findOne(storeCategoryId);

    if (!storeCategoryExists) {
      throw new NotFoundException('Store category not found');
    }

    const data: Prisma.StoreCreateInput = {
      name,
      description,
      owner: { connect: { id: ownerId } },
      storeCategory: { connect: { id: storeCategoryId } },
      ...(products?.length
        ? {
            products: {
              connect: products.map((product) => ({
                id: product.id,
              })),
            },
          }
        : {}),
    };

    try {
      return await this.databaseService.store.create({ data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Store name already exists');
        }
      }
      throw error;
    }
  }

  async findAll(query: UpdateStoreDto) {
    const filters: Prisma.StoreWhereInput = {};

    if (query.name) {
      filters.name = { contains: query.name, mode: 'insensitive' };
    }

    if (query.ownerId) {
      filters.owner = { id: query.ownerId };
    }

    if (query.storeCategoryId) {
      filters.storeCategory = { id: query.storeCategoryId };
    }

    const stores = await this.databaseService.store.findMany({
      where: filters,
    });

    if (!stores || stores.length === 0) {
      throw new BadRequestException('Stores not found');
    }

    return stores;
  }

  async findOne(id: string) {
    return await this.databaseService.store.findUnique({ where: { id } });
  }

  async update(id: string, updateStoreDto: UpdateStoreDto) {
    const { name, description, ownerId, storeCategoryId, products } =
      updateStoreDto;

    const ownerExists = ownerId
      ? await this.usersService.findOne(ownerId)
      : false;

    if (ownerExists != false && !ownerExists) {
      throw new NotFoundException('Owner not found');
    }

    const storeCategoryExists = storeCategoryId
      ? await this.storeCategoriesService.findOne(storeCategoryId)
      : false;

    if (storeCategoryId != undefined && !storeCategoryExists) {
      throw new NotFoundException('Store category not found');
    }

    const data: Prisma.StoreUpdateInput = {
      name,
      description,
      ...{ owner: { connect: { id: ownerId } } },
      ...{ storeCategory: { connect: { id: storeCategoryId } } },
      ...(products?.length
        ? {
            products: {
              connect: products.map((product) => ({
                id: product.id,
              })),
            },
          }
        : {}),
    };

    try {
      return await this.databaseService.store.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Store name already exists');
        }
      }
      throw error;
    }
  }

  async remove(id: string) {
    return await this.databaseService.store.delete({ where: { id } });
  }
}
