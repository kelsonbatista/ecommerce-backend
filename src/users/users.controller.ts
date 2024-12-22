import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto, UserFilterDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users or /users?role=value
  findAll(@Query() query: UserFilterDto) {
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id); // +id coverts id to number ou Number(id) or use ParseIntPipe
  }

  @Post() // POST /users
  create(
    @Body(ValidationPipe)
    user: UserDto,
  ) {
    return this.usersService.create(user);
  }

  @Patch(':id') // PATCH /users/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    userUpdate: UserFilterDto,
  ) {
    return this.usersService.update(id, userUpdate);
  }

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
