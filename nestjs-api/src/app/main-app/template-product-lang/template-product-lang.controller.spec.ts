import { Test, TestingModule } from '@nestjs/testing';
import { TemplateProductLangController } from './template-product-lang.controller';

describe('TemplateProductLangController', () => {
  let controller: TemplateProductLangController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateProductLangController],
    }).compile();

    controller = module.get<TemplateProductLangController>(TemplateProductLangController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
