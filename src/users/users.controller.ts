import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserDto, UserFilterDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: UserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: UserFilterDto) {
    return this.usersService.findAll(query);
  }

  @Get('sellers')
  findAllSellers() {
    return this.usersService.findAll({ role: 'SELLER' });
  }

  @Get('partners')
  findAllPartners() {
    return this.usersService.findAll({ role: 'PARTNER' });
  }

  @Get('regulars')
  findAllRegulars() {
    return this.usersService.findAll({ role: 'USER' });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
