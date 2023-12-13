import { Test, TestingModule } from '@nestjs/testing';
import { TemplateProductController } from './template-product.controller';

describe('TemplateProductController', () => {
  let controller: TemplateProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateProductController],
    }).compile();

    controller = module.get<TemplateProductController>(TemplateProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
