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
import { UsersService } from './users.service';
import { IUser, IUserFilter } from './users.types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users or /users?role=value
  findAll(@Query() query: IUserFilter) {
    return this.usersService.findAll(query);
  }

  @Get('sellers') // GET /users/stores
  findAllSellers() {
    return this.usersService.findAll({ role: 'seller' });
  }

  @Get('partners') // GET /users/partners
  findAllPartners() {
    return this.usersService.findAll({ role: 'partner' });
  }

  @Get('regulars') // GET /users/regulars
  findAllRegulars() {
    return this.usersService.findAll({ role: 'regular' });
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id); // +id coverts id to number ou Number(id)
  }

  @Post() // POST /users
  create(
    @Body()
    user: IUser,
  ) {
    return this.usersService.create(user);
  }

  @Patch(':id') // PATCH /users/:id
  update(
    @Param('id') id: string,
    @Body()
    userUpdate: IUserFilter,
  ) {
    return this.usersService.update(+id, userUpdate);
  }

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
