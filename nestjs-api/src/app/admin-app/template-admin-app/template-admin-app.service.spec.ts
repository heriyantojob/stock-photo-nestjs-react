import { Test, TestingModule } from '@nestjs/testing';
import { TemplateAdminAppService } from './template-admin-app.service';

describe('TemplateAdminAppService', () => {
  let service: TemplateAdminAppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateAdminAppService],
    }).compile();

    service = module.get<TemplateAdminAppService>(TemplateAdminAppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
