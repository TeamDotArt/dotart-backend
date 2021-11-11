import {
  BotInfoResponse,
  Client,
  FlexMessage,
  ImageMapMessage,
  Message,
  Profile,
} from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LineHandler {
  private client: Client;
  constructor() {
    this.client = new Client({
      channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
      channelSecret: process.env.LINE_CHANNEL_SERCRET,
    });
  }

  // Message
  async pushMessage(
    user_id: string,
    messageTemplate: Message | Message[] | FlexMessage | ImageMapMessage,
  ): Promise<void> {
    try {
      await this.client.pushMessage(user_id, messageTemplate);
    } catch (e) {
      console.log(e);
    }
  }

  async replyMessage(
    reply_token: string,
    messageTemplate: Message | Message[] | FlexMessage | ImageMapMessage,
  ): Promise<void> {
    await this.client.replyMessage(reply_token, messageTemplate);
  }

  async multiCastMessage(
    ids: string[],
    message: Message | Message[] | FlexMessage | ImageMapMessage,
  ): Promise<void> {
    await this.client.multicast(ids, message);
  }

  async broadCastMessage(
    message: Message | Message[] | FlexMessage | ImageMapMessage,
  ): Promise<void> {
    await this.client.broadcast(message);
  }

  async narrowcCastCastMessage(
    message: Message | Message[] | FlexMessage | ImageMapMessage,
  ): Promise<void> {
    await this.client.narrowcast(message);
  }

  async getBotInfo(): Promise<BotInfoResponse> {
    return await this.client.getBotInfo();
  }

  // bot Event
  async leaveChat(groupOrRoomId: string): Promise<void> {
    if (groupOrRoomId.startsWith('C')) {
      await this.client.leaveGroup(groupOrRoomId);
    } else if (groupOrRoomId.startsWith('R')) {
      await this.client.leaveRoom(groupOrRoomId);
    }
  }

  // Profile
  async getProfile(user_id: string): Promise<Profile> {
    return await this.client.getProfile(user_id);
  }
}
