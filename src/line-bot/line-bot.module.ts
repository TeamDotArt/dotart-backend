import { Module } from '@nestjs/common';
import { LineBotService } from './line-bot.service';
import { LineBotController } from './line-bot.controller';

@Module({
  controllers: [LineBotController],
  providers: [LineBotService],
})
export class LineBotModule {}
