import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { UserDto, UserFilterDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: UserDto) {
    const data: Prisma.UserCreateInput = {
      name: createUserDto.name,
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password,
      role: createUserDto.role,
    };

    try {
      return await this.databaseService.user.create({ data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Username or email already exists');
        }
      }
      throw error;
    }
  }

  async findAll(query: UserFilterDto) {
    const filters: Prisma.UserWhereInput = {};

    if (query.name) {
      filters.name = { contains: query.name, mode: 'insensitive' };
    }

    if (query.username) {
      filters.username = { contains: query.username, mode: 'insensitive' };
    }

    if (query.email) {
      filters.email = { contains: query.email, mode: 'insensitive' };
    }

    if (query.role) {
      filters.role = { equals: query.role };
    }

    const users = await this.databaseService.user.findMany({ where: filters });

    if (!users || users.length === 0) {
      throw new NotFoundException('Users not found');
    }

    return users;
  }

  async findOne(id: string) {
    return await this.databaseService.user.findUnique({ where: { id } });
  }

  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    return await this.databaseService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return await this.databaseService.user.delete({ where: { id } });
  }
}
