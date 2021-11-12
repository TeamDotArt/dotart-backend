import { Module } from '@nestjs/common';
import { LineBotService } from './line-bot.service';
import { LineBotController } from './line-bot.controller';
// handler
import { FollowHandler } from './handlers/followHandler';
import { JoinHandler } from './handlers/joinHandler';
import { UserHandler } from './handlers/userHandler';
import { GroupHandler } from './handlers/groupHandler';
import { RoomHandler } from './handlers/roomHandler';
import { LineHandler } from './handlers/lineHandler';

@Module({
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
export class LineBotModule {}
