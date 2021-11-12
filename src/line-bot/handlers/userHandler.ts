import { MessageEvent } from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';
import { prefix } from '../helper/prefix';
import { textMessage } from '../messageTemplate/textMessage';
import { MessageTypes } from '../types/message';
import { LineHandler } from './lineHandler';

@Injectable()
export class UserHandler {
  constructor(private readonly lineHandler: LineHandler) {}

  // handler
  async userEvent(event: MessageEvent) {
    const { message } = event;
    if (!(message.type === MessageTypes.TEXT)) {
      return;
    }
    // prefixをdotartまたはDotArtに設定
    const messageObj = message.text.split(' ');
    if (!prefix(messageObj[0])) {
      return;
    }

    switch (messageObj[1]) {
      case '使い方':
        await this.lineHandler.replyMessage(
          event.replyToken,
          textMessage(
            '個人チャットではコマンドは使い方しか存在しません。\nhttps://dotart.riml.work\nをお楽しみください！',
          ),
        );
        break;

      default:
        break;
    }
  }
}
