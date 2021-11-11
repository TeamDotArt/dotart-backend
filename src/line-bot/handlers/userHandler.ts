import { MessageEvent } from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';
import { textMessage } from '../messageTemplate/textMessage';
import { LineHandler } from './lineHandler';

@Injectable()
export class UserHandler {
  constructor(private readonly lineHandler: LineHandler) {}

  // handler
  async userEvent(event: MessageEvent) {
    await this.lineHandler.replyMessage(
      event.replyToken,
      textMessage('メッセージありがとうございます。'),
    );
  }
}
