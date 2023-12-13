import { Test, TestingModule } from '@nestjs/testing';
import { TemplateProductLangService } from './template-product-lang.service';

describe('TemplateProductLangService', () => {
  let service: TemplateProductLangService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateProductLangService],
    }).compile();

    service = module.get<TemplateProductLangService>(TemplateProductLangService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
