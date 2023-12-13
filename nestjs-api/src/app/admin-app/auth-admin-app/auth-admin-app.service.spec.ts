import { Test, TestingModule } from '@nestjs/testing';
import { AuthAdminAppService } from './auth-admin-app.service';

describe('AuthAdminAppService', () => {
  let service: AuthAdminAppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthAdminAppService],
    }).compile();

    service = module.get<AuthAdminAppService>(AuthAdminAppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
