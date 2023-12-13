import { Test, TestingModule } from '@nestjs/testing';
import { AdminSessionService } from './admin-session.service';

describe('AdminSessionService', () => {
  let service: AdminSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminSessionService],
    }).compile();

    service = module.get<AdminSessionService>(AdminSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
