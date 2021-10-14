import { Test, TestingModule } from '@nestjs/testing';
import { UserpalletService } from './userpallet.service';

describe('UserpalletService', () => {
  let service: UserpalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserpalletService],
    }).compile();

    service = module.get<UserpalletService>(UserpalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
