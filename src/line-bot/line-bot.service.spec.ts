import { Test, TestingModule } from '@nestjs/testing';
import { RoleGuard } from '../auth/guards/role.guard';
import { FollowHandler } from './handlers/followHandler';
import { GroupHandler } from './handlers/groupHandler';
import { JoinHandler } from './handlers/joinHandler';
import { LineHandler } from './handlers/lineHandler';
import { RoomHandler } from './handlers/roomHandler';
import { UserHandler } from './handlers/userHandler';
import { LineBotService } from './line-bot.service';

describe('LineBotService', () => {
  let service: LineBotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LineBotService,
        FollowHandler,
        JoinHandler,
        LineHandler,
        RoomHandler,
        UserHandler,
        GroupHandler,
      ],
    })
      .overrideGuard(RoleGuard)
      .useValue({ canActivate: () => true })
      .compile();
    service = module.get<LineBotService>(LineBotService);
  });

  it('サービスがUndefinedではないか', () => {
    expect(service).toBeDefined();
  });
});
