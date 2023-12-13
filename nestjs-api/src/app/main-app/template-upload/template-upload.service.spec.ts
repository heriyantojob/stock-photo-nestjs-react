import { Test, TestingModule } from '@nestjs/testing';
import { TemplateUploadService } from './template-upload.service';

describe('TemplateUploadService', () => {
  let service: TemplateUploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateUploadService],
    }).compile();

    service = module.get<TemplateUploadService>(TemplateUploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
