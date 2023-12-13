import { Test, TestingModule } from '@nestjs/testing';
import { TemplateUploadController } from './template-upload.controller';

describe('TemplateUploadController', () => {
  let controller: TemplateUploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateUploadController],
    }).compile();

    controller = module.get<TemplateUploadController>(TemplateUploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
