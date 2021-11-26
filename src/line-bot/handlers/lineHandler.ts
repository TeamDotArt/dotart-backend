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
  #_client: Client;
  constructor() {
    this.#_client = new Client({
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
      await this.#_client.pushMessage(user_id, messageTemplate);
    } catch (e) {
      console.log(e);
    }
  }

  async replyMessage(
    reply_token: string,
    messageTemplate: Message | Message[] | FlexMessage | ImageMapMessage,
  ): Promise<void> {
    await this.#_client.replyMessage(reply_token, messageTemplate);
  }

  async multiCastMessage(
    ids: string[],
    message: Message | Message[] | FlexMessage | ImageMapMessage,
  ): Promise<void> {
    await this.#_client.multicast(ids, message);
  }

  async broadCastMessage(
    message: Message | Message[] | FlexMessage | ImageMapMessage,
  ): Promise<void> {
    await this.#_client.broadcast(message);
  }

  async narrowcCastCastMessage(
    message: Message | Message[] | FlexMessage | ImageMapMessage,
  ): Promise<void> {
    await this.#_client.narrowcast(message);
  }

  // bot info
  async getBotInfo(): Promise<BotInfoResponse> {
    return await this.#_client.getBotInfo();
  }

  // bot Event
  async leaveChat(groupOrRoomId: string): Promise<void> {
    if (groupOrRoomId.startsWith('C')) {
      await this.#_client.leaveGroup(groupOrRoomId);
    } else if (groupOrRoomId.startsWith('R')) {
      await this.#_client.leaveRoom(groupOrRoomId);
    }
  }

  // Profile
  async getProfile(user_id: string): Promise<Profile> {
    return await this.#_client.getProfile(user_id);
  }
}
