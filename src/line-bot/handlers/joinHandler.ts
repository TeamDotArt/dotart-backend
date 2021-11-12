import { JoinEvent } from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';
import { textMessage } from '../messageTemplate/textMessage';
import { LineHandler } from './lineHandler';

@Injectable()
export class JoinHandler {
  constructor(private readonly lineHandler: LineHandler) {}

  async joinEvent(events: JoinEvent): Promise<void> {
    const text = `ご招待ありがとうございます！\nDotArt公式アカウントです！\nhttps://dotart.riml.work\n\ndotart 使い方\nと送信することでアクションを確認できます。\nぜひ楽しんでいただけたら嬉しいです！`;
    this.lineHandler.replyMessage(events.replyToken, textMessage(text));
  }
}
