import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { HealthController } from './health/health.controller';
import { UsersModule } from './users/users.module';
import { StoresModule } from './stores/stores.module';
import { StoreCategoriesModule } from './store-categories/store-categories.module';

@Module({
  imports: [UsersModule, DatabaseModule, StoresModule, StoreCategoriesModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
