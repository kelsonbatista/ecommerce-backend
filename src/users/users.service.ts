import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const { username, email, password, role } = createUserDto;

    const data: Prisma.UserCreateInput = {
      username,
      email,
      password,
      role,
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

  async findAll(query: UpdateUserDto) {
    const filters: Prisma.UserWhereInput = {};

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

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { username, email, password, role } = updateUserDto;

    const data: Prisma.UserUpdateInput = {
      username,
      email,
      password,
      role,
    };

    try {
      return await this.databaseService.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Username or email already exists');
        }
      }
      throw error;
    }
  }

  async remove(id: string) {
    return await this.databaseService.user.delete({ where: { id } });
  }
}
