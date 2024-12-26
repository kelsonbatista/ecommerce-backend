import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { StoreCategoriesService } from 'src/store-categories/store-categories.service';
import { UsersService } from 'src/users/users.service';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';

@Module({
  imports: [DatabaseModule],
  controllers: [StoresController],
  providers: [StoresService, UsersService, StoreCategoriesService],
})
export class StoresModule {}
