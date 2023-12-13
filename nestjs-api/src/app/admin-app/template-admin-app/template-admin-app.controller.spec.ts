import { Test, TestingModule } from '@nestjs/testing';
import { TemplateAdminAppController } from './template-admin-app.controller';

describe('TemplateAdminAppController', () => {
  let controller: TemplateAdminAppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateAdminAppController],
    }).compile();

    controller = module.get<TemplateAdminAppController>(TemplateAdminAppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
