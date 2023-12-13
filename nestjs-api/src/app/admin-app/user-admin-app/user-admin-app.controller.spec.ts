import { Test, TestingModule } from '@nestjs/testing';
import { UserAdminAppController } from './user-admin-app.controller';

describe('UserAdminAppController', () => {
  let controller: UserAdminAppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAdminAppController],
    }).compile();

    controller = module.get<UserAdminAppController>(UserAdminAppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
