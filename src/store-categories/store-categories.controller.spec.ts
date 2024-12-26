import { Test, TestingModule } from '@nestjs/testing';
import { StoreCategoriesController } from './store-categories.controller';
import { StoreCategoriesService } from './store-categories.service';

describe('StoreCategoriesController', () => {
  let controller: StoreCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreCategoriesController],
      providers: [StoreCategoriesService],
    }).compile();

    controller = module.get<StoreCategoriesController>(StoreCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
