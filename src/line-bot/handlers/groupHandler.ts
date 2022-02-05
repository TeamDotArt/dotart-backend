import { MessageEvent, Group } from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';
import { prefix } from '../helper/prefix';
import { textMessage } from '../messageTemplate/textMessage';
import { MessageTypes } from '../types/message';
import { CommandHandler } from './commandHandler';
import { LineHandler } from './lineHandler';

@Injectable()
export class GroupHandler {
  constructor(
    private readonly _commandHandler: CommandHandler,
    private readonly _lineHandler: LineHandler,
  ) {}

  // handler
  async groupEvent(event: MessageEvent) {
    const { message, replyToken, source } = event;
    if (!(message.type === MessageTypes.TEXT)) {
      return;
    }
    // prefixをdotartまたはDotArtに設定
    const messageObj = message.text.split(' ');
    if (!prefix(messageObj[0])) {
      return;
    }
    // group情報
    const group = source as Group;

    switch (messageObj[1]) {
      case '使い方':
        const retUsageCarousel = await this._commandHandler.uasgeEvacuation();
        await this._lineHandler.replyMessage(replyToken, retUsageCarousel);
        break;
      // const retUsage = await this._commandHandler.usage();
      // const retUsage2 = await this._commandHandler.usage2();
      // const retUsage3 = await this._commandHandler.usage3();
      // await this._lineHandler.replyMessage(replyToken, [
      //   retUsage,
      //   retUsage2,
      //   retUsage3,
      // ]);
      // break;

      case '退会':
        await this._lineHandler.replyMessage(
          replyToken,
          textMessage('ありがとうございました。'),
        );
        await this._lineHandler.leaveChat(group.groupId);
        break;

      case 'おはよう':
        const retGoodMooning = await this._commandHandler.goodMooning();
        await this._lineHandler.replyMessage(replyToken, retGoodMooning);
        break;

      case 'こんにちは':
        const retHello = await this._commandHandler.Hello();
        await this._lineHandler.replyMessage(replyToken, retHello);
        break;

      case 'こんばんは':
        const retEvening = await this._commandHandler.goodEvening();
        await this._lineHandler.replyMessage(replyToken, retEvening);
        break;

      case 'さようなら':
        await this._lineHandler.replyMessage(
          replyToken,
          textMessage('ありがとうございました。'),
        );
        await this._lineHandler.leaveChat(group.groupId);
        break;

      case 'スタンプ':
        const retStamp = await this._commandHandler.stamp();
        await this._lineHandler.replyMessage(replyToken, retStamp);
        break;

      case '乾杯':
        const retCheersStamp = await this._commandHandler.cheers();
        await this._lineHandler.replyMessage(replyToken, retCheersStamp);
        break;

      case 'じゃんけん':
        const retjanken = await this._commandHandler.janken();
        await this._lineHandler.replyMessage(replyToken, retjanken);
        break;

      case 'ドット絵ゲーム':
        const retdotartGame = await this._commandHandler.dotartGame();
        await this._lineHandler.replyMessage(replyToken, retdotartGame);
        break;

      // 未認証のアカウントは不可
      // case 'グループメンバー全取得':
      //   const req = await this._lineHandler.getGroupMemberIds(group.groupId);
      //   console.log(req);
      //   break;

      case 'メンバーのプロフィールを取得':
        await this._commandHandler.getProfile(replyToken, group);
        break;

      case 'グループ概要':
        await this._commandHandler.groupOverView(replyToken, group);
        break;

      case 'メンバー人数':
        await this._commandHandler.getMemberCount(replyToken, group);
        break;

      case 'メッセージ送信数':
        await this._commandHandler.NumberOfMessageDeliveries(replyToken);
        break;

      case '友達数':
        await this._commandHandler.friendCount(replyToken);
        break;

      case 'おやすみ':
        await this._commandHandler.goodNightStamp(replyToken);
        break;

      case '疲れた':
        await this._commandHandler.tiredStamp(replyToken);
        break;

      case 'うんち':
        await this._commandHandler.pooStamp(replyToken);
        break;

      case 'メッセージ上限':
        await this._commandHandler.messaageLimit(replyToken);
        break;

      case 'メッセージ数_月':
        await this._commandHandler.messageCountMonth(replyToken);
        break;

      case '送信済み応答メッセージ':
        await this._commandHandler.NumberOfSentReplyMessages(replyToken);
        break;

      case '送信済みプッシュメッセージ数':
        await this._commandHandler.NumberOfSentPushMessages(replyToken);
        break;

      case '送信済みマルチキャストメッセージ数':
        await this._commandHandler.NumberOfSentMulticastMessages(replyToken);
        break;

      case '送信済みブロードキャストメッセージ数':
        await this._commandHandler.NumberOfSentBroadcastMessages(replyToken);
        break;

      case 'アプリ':
        await this._commandHandler.application(replyToken);
        break;

      default:
        break;
    }
  }
}
