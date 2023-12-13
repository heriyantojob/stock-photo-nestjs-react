import { Test, TestingModule } from '@nestjs/testing';
import { UserAdminAppService } from './user-admin-app.service';

describe('UserAdminAppService', () => {
  let service: UserAdminAppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAdminAppService],
    }).compile();

    service = module.get<UserAdminAppService>(UserAdminAppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
