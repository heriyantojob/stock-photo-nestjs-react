import { Test, TestingModule } from '@nestjs/testing';
import { AdminAdminAppController } from './admin-admin-app.controller';

describe('AdminAdminAppController', () => {
  let controller: AdminAdminAppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminAdminAppController],
    }).compile();

    controller = module.get<AdminAdminAppController>(AdminAdminAppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
