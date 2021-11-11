import { MessageEvent, Group } from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';
import { textMessage } from '../messageTemplate/textMessage';
import { MessageTypes } from '../types/message';
import { LineHandler } from './lineHandler';

@Injectable()
export class GroupHandler {
  constructor(private readonly lineHandler: LineHandler) {}

  // handler
  async groupEvent(event: MessageEvent) {
    const { message, replyToken, source } = event;
    if (!(message.type === MessageTypes.TEXT)) {
      return;
    }
    // prefixをdotartまたはDotArtに設定
    const messageObj = message.text.split(' ');
    if (!(messageObj[0] === 'dotart' || messageObj[0] === 'DotArt')) {
      return;
    }
    // group情報
    const group = source as Group;

    switch (messageObj[1]) {
      case '使い方':
        await this.lineHandler.replyMessage(replyToken, textMessage('使い方'));
        break;

      case '退会':
        await this.lineHandler.replyMessage(
          replyToken,
          textMessage('ありがとうございました。'),
        );
        await this.lineHandler.leaveChat(group.groupId);
        break;

      default:
        break;
    }
  }
}
