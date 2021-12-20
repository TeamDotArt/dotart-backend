import { FollowEvent, Message } from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';
import { imageMapMessage } from '../messageTemplate/imageMapMessage';
import { textMessage } from '../messageTemplate/textMessage';
import { LineHandler } from './lineHandler';

@Injectable()
export class FollowHandler {
  constructor(private readonly _lineHandler: LineHandler) {}

  async followEvent(events: FollowEvent): Promise<void> {
    const profile = await this._lineHandler.getProfile(events.source.userId);
    const text = `友だち追加ありがとうございます\n${profile.displayName}さんはじめまして！\nDotArt公式アカウントです！\nhttps://dotart.riml.work\n\nぜひ楽しんでいただけたら嬉しいです！`;
    const message: Message[] = [
      textMessage(text),
      imageMapMessage(
        'https://github.com/TeamDotArt/dotart_frontend/blob/develop/assets/dotart.png?raw=true',
        'https://dotart.riml.work',
        '友だち追加ありがとうございます!DotArt公式アカウントです!',
      ),
    ];
    this._lineHandler.replyMessage(events.replyToken, message);
  }
}
