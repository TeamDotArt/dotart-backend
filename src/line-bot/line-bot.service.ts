import { Client, FlexMessage, Message, WebhookEvent } from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';
import { CreateLineBotDto } from './dto/create-line-bot.dto';
import { UpdateLineBotDto } from './dto/update-line-bot.dto';

@Injectable()
export class LineBotService {
  private client: Client;
  constructor() {
    this.client = new Client({
      channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
      channelSecret: process.env.LINE_CHANNEL_SERCRET,
    });
  }

  // postback
  async run(events: WebhookEvent) {
    switch (events.type) {
      case 'message':
        if (events.source.type === 'user') {
          await this.userHandler(events);
        } else if (events.source.type === 'group') {
          await this.groupHandler(events);
        } else if (events.source.type === 'room') {
          await this.leaveRoom(events.source.roomId);
        }
        break;

      // トーク取り消し
      case 'unsend':
        console.log('Event -> unsend');
        break;

      // 友達追加された
      case 'follow':
        console.log('Event -> follow');
        break;

      // ブロックまたは削除された
      case 'unfollow':
        console.log('Event -> follow');
        break;

      // 自分がグループに参加した
      case 'join':
        console.log('Event -> join');
        break;

      // 自分がグループから退出した
      case 'leave':
        console.log('Event -> leave');
        break;

      // 誰かがグループに参加した
      case 'memberJoined':
        console.log('Event -> memberJoined');
        break;

      // 誰かがグループから退出した
      case 'memberLeft':
        console.log('Event -> memberLeft');
        break;

      default:
        console.log(events);
        break;
    }
    return events;
  }

  async userHandler(event) {
    const message: Message = {
      type: 'text',
      text: 'user chat',
    };
    await this.replyMessage(event.replyToken, message);
  }

  async groupHandler(event) {
    const message: Message = {
      type: 'text',
      text: 'group chat',
    };
    await this.replyMessage(event.replyToken, message);
  }

  // MessageEvent
  async pushMessage(
    user_id: string,
    messageTemplate: Message | Message[] | FlexMessage,
  ): Promise<void> {
    try {
      await this.client.pushMessage(user_id, messageTemplate);
    } catch (e) {
      console.log(e);
    }
  }

  async replyMessage(
    reply_token: string,
    messageTemplate: Message | Message[] | FlexMessage,
  ): Promise<void> {
    await this.client.replyMessage(reply_token, messageTemplate);
  }

  // RoomEvent
  async leaveRoom(room_id: string): Promise<void> {
    await this.client.leaveRoom(room_id);
  }
}
