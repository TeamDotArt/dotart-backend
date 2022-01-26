import { Test, TestingModule } from '@nestjs/testing';
import { RoleGuard } from '../auth/guards/role.guard';
import { FollowHandler } from './handlers/followHandler';
import { GroupHandler } from './handlers/groupHandler';
import { JoinHandler } from './handlers/joinHandler';
import { LineHandler } from './handlers/lineHandler';
import { RoomHandler } from './handlers/roomHandler';
import { UserHandler } from './handlers/userHandler';
import { LineBotController } from './line-bot.controller';
import { LineBotService } from './line-bot.service';

describe('LineBotController', () => {
  let controller: LineBotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LineBotController],
      providers: [
        LineBotService,
        FollowHandler,
        JoinHandler,
        UserHandler,
        GroupHandler,
        RoomHandler,
        LineHandler,
      ],
    })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<LineBotController>(LineBotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
