import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { StoreCategoriesController } from './store-categories.controller';
import { StoreCategoriesService } from './store-categories.service';

@Module({
  imports: [DatabaseModule],
  controllers: [StoreCategoriesController],
  providers: [StoreCategoriesService],
})
export class StoreCategoriesModule {}
