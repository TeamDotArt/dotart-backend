import { Test, TestingModule } from '@nestjs/testing';
import { UserPalletController } from './user-pallet.controller';
import { UserpalletService } from './user-pallet.service';

describe('UserPalletController', () => {
  let controller: UserPalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPalletController],
      providers: [UserpalletService],
    }).compile();

    controller = module.get<UserPalletController>(UserPalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
