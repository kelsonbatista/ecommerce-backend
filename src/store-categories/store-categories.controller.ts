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
import { CreateStoreCategoryDto } from './dto/create-store-category.dto';
import { UpdateStoreCategoryDto } from './dto/update-store-category.dto';
import { StoreCategoriesService } from './store-categories.service';

@Controller('store-categories')
export class StoreCategoriesController {
  constructor(
    private readonly storeCategoriesService: StoreCategoriesService,
  ) {}

  @Post()
  create(@Body() createStoreCategoryDto: CreateStoreCategoryDto) {
    return this.storeCategoriesService.create(createStoreCategoryDto);
  }

  @Get()
  findAll(@Query() query: UpdateStoreCategoryDto) {
    return this.storeCategoriesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeCategoriesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStoreCategoryDto: UpdateStoreCategoryDto,
  ) {
    return this.storeCategoriesService.update(id, updateStoreCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeCategoriesService.remove(id);
  }
}
