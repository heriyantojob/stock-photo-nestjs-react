import { Test, TestingModule } from '@nestjs/testing';
import { TemplateProductService } from './template-product.service';

describe('TemplateProductService', () => {
  let service: TemplateProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateProductService],
    }).compile();

    service = module.get<TemplateProductService>(TemplateProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
