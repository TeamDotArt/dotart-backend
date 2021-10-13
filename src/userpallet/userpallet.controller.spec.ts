import { Test, TestingModule } from '@nestjs/testing';
import { UserpalletController } from './userpallet.controller';
import { UserpalletService } from './userpallet.service';

describe('UserpalletController', () => {
  let controller: UserpalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserpalletController],
      providers: [UserpalletService],
    }).compile();

    controller = module.get<UserpalletController>(UserpalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
