import { Test, TestingModule } from '@nestjs/testing';
import { AuthAdminAppController } from './auth-admin-app.controller';

describe('AuthAdminAppController', () => {
  let controller: AuthAdminAppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthAdminAppController],
    }).compile();

    controller = module.get<AuthAdminAppController>(AuthAdminAppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
