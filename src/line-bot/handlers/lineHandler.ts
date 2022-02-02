import {
  BotInfoResponse,
  Client,
  FlexMessage,
  GroupSummaryResponse,
  ImageMapMessage,
  MembersCountResponse,
  Message,
  NumberOfFollowersResponse,
  NumberOfMessageDeliveriesResponse,
  NumberOfMessagesSentResponse,
  NumberOfMessagesSentThisMonth,
  Profile,
  TargetLimitForAdditionalMessages,
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

  // 送信済みのブロードキャストメッセージの数を取得
  async getNumberOfSentBroadcastMessages(
    date: string,
  ): Promise<NumberOfMessagesSentResponse> {
    try {
      return await this.#_client.getNumberOfSentBroadcastMessages(date);
    } catch (e) {
      console.log(e);
    }
  }

  // 送信済みのマルチキャストメッセージの数を取得
  async getNumberOfSentMulticastMessages(
    date: string,
  ): Promise<NumberOfMessagesSentResponse> {
    try {
      return await this.#_client.getNumberOfSentMulticastMessages(date);
    } catch (e) {
      console.log(e);
    }
  }

  // 送信済みのプッシュメッセージの数を取得
  async getNumberOfSentPushMessages(
    date: string,
  ): Promise<NumberOfMessagesSentResponse> {
    try {
      return await this.#_client.getNumberOfSentPushMessages(date);
    } catch (e) {
      console.log(e);
    }
  }

  // 送信済みの応答メッセージの数を取得
  async getNumberOfSentReplyMessages(
    date: string,
  ): Promise<NumberOfMessagesSentResponse> {
    try {
      return await this.#_client.getNumberOfSentReplyMessages(date);
    } catch (e) {
      console.log(e);
    }
  }

  // 当月のメッセージ利用状況を取得
  async getNumberOfMessagesSentThisMonth(): Promise<NumberOfMessagesSentThisMonth> {
    try {
      return await this.#_client.getNumberOfMessagesSentThisMonth();
    } catch (e) {
      console.log(e);
    }
  }

  // 追加メッセージ数の上限目安を取得
  async getTargetLimitForAdditionalMessages(): Promise<TargetLimitForAdditionalMessages> {
    try {
      return await this.#_client.getTargetLimitForAdditionalMessages();
    } catch (e) {
      console.log(e);
    }
  }

  // 友達数を取得する
  async getNumberOfFollowers(date: string): Promise<NumberOfFollowersResponse> {
    try {
      return await this.#_client.getNumberOfFollowers(date);
    } catch (e) {
      console.log(e);
    }
  }

  // メッセージの送信数を取得する
  async getNumberOfMessageDeliveries(
    date: string,
  ): Promise<NumberOfMessageDeliveriesResponse> {
    try {
      return await this.#_client.getNumberOfMessageDeliveries(date);
    } catch (e) {
      console.log(e);
    }
  }

  // グループの概要を取得する
  async getGroupSummary(groupId: string): Promise<GroupSummaryResponse> {
    try {
      return await this.#_client.getGroupSummary(groupId);
    } catch (e) {
      console.log(e);
    }
  }

  //グループに参加しているユーザーの人数を取得する
  async getGroupMembersCount(groupId: string): Promise<MembersCountResponse> {
    try {
      return await this.#_client.getGroupMembersCount(groupId);
    } catch (e) {
      console.log(e);
    }
  }

  // グループメンバーのプロフィール情報を取得する
  async getGroupMemberProfile(
    groupId: string,
    userId: string,
  ): Promise<Profile> {
    try {
      return await this.#_client.getGroupMemberProfile(groupId, userId);
    } catch (e) {
      console.log(e);
    }
  }

  // グループメンバー全取得
  async getGroupMemberIds(groupId: string): Promise<string[]> {
    try {
      return await this.#_client.getGroupMemberIds(groupId);
    } catch (e) {
      console.log(e);
    }
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
