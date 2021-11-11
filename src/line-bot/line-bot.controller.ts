import { Controller, Post, Body } from '@nestjs/common';
import { LineBotService } from './line-bot.service';
import { WebhookRequestBody } from '@line/bot-sdk';

@Controller('line-bot')
export class LineBotController {
  constructor(private readonly lineBotService: LineBotService) {}

  @Post('webhook')
  async lineWebhook(@Body() { events }: WebhookRequestBody): Promise<any> {
    return this.lineBotService.run(events[0]);
  }
}
