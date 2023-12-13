import { Test, TestingModule } from '@nestjs/testing';
import { AdminAdminAppService } from './admin-admin-app.service';

describe('AdminAdminAppService', () => {
  let service: AdminAdminAppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminAdminAppService],
    }).compile();

    service = module.get<AdminAdminAppService>(AdminAdminAppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
