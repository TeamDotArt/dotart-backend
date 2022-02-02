import {
  MessageEvent,
  Group,
  NumberOfFollowers,
  NumberOfMessageDeliveries,
} from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';
import { prefix } from '../helper/prefix';
import { textMessage } from '../messageTemplate/textMessage';
import { MessageTypes } from '../types/message';
import { LineHandler } from './lineHandler';

@Injectable()
export class GroupHandler {
  constructor(private readonly _lineHandler: LineHandler) {}

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
        await this._lineHandler.replyMessage(replyToken, textMessage('使い方'));
        break;

      case '退会':
        await this._lineHandler.replyMessage(
          replyToken,
          textMessage('ありがとうございました。'),
        );
        await this._lineHandler.leaveChat(group.groupId);
        break;

      case 'おはよう':
        await this._lineHandler.replyMessage(
          replyToken,
          textMessage('おはようございます！'),
        );
        break;

      case 'こんにちは':
        await this._lineHandler.replyMessage(
          replyToken,
          textMessage('こんにちは！'),
        );
        break;

      case 'こんばんは':
        await this._lineHandler.replyMessage(
          replyToken,
          textMessage('こんばんは！'),
        );
        break;

      case 'さようなら':
        await this._lineHandler.replyMessage(
          replyToken,
          textMessage('ありがとうございました。'),
        );
        await this._lineHandler.leaveChat(group.groupId);
        break;

      case 'スタンプ':
        await this._lineHandler.replyMessage(replyToken, {
          type: 'sticker',
          packageId: '11538',
          stickerId: '51626494',
        });
        break;

      case '乾杯':
        await this._lineHandler.replyMessage(replyToken, {
          type: 'sticker',
          packageId: '2',
          stickerId: '28',
        });
        break;

      case 'じゃんけん':
        // ドット絵ゲーム一覧
        const jankenList = ['グー', 'チョキ', 'パー'];
        const janken =
          jankenList[Math.floor(Math.random() * jankenList.length)]; // じゃんけんリストからランダムに要素を取得
        await this._lineHandler.replyMessage(replyToken, {
          type: 'template',
          altText: 'じゃんけんをレコメンドします',
          template: {
            type: 'buttons',
            text: `最初はグー、じゃんけん…`,
            actions: [
              {
                type: 'message',
                label: 'グー',
                text: `私は${janken}を出しました！`,
              },
              {
                type: 'message',
                label: 'チョキ',
                text: `私は${janken}を出しました！`,
              },
              {
                type: 'message',
                label: 'パー',
                text: `私は${janken}を出しました！`,
              },
            ],
          },
        });
        break;

      case 'ドット絵ゲーム':
        // ドット絵ゲーム一覧
        const pixelArtGameList = [
          'ドラクエ',
          'クロノトリガー',
          'FF',
          'メタルスラッグ',
          'ルドラの秘宝',
          'タクティクス・オウガ',
        ];
        const pixelArtGame =
          pixelArtGameList[Math.floor(Math.random() * pixelArtGameList.length)]; // ドット絵ゲームリストからランダムに要素を取得
        await this._lineHandler.replyMessage(replyToken, {
          type: 'template',
          altText: 'ドット絵をレコメンドします',
          template: {
            type: 'confirm',
            text: `ドット絵ゲームは好きですか？`,
            actions: [
              {
                type: 'message', //"NO"が押されたらmessageアクション
                label: 'NO',
                text: `ドット絵ゲームも面白いのでぜひプレイしてみましょう！`,
              },
              {
                type: 'message', //"YES"が押されたらmessageアクション
                label: 'YES',
                text: `おすすめのドット絵ゲームは${pixelArtGame}で決まり！`,
              },
            ],
          },
        });
        break;

      // 未認証のアカウントは不可
      // case 'グループメンバー全取得':
      //   const req = await this._lineHandler.getGroupMemberIds(group.groupId);
      //   console.log(req);
      //   break;

      case 'グループメンバーのプロフィールを取得':
        const resProfile = await this._lineHandler.getGroupMemberProfile(
          group.groupId,
          group.userId,
        );
        await this._lineHandler.replyMessage(
          replyToken,
          textMessage(
            'name:' +
              String(resProfile.displayName) +
              '\n' +
              'language:' +
              String(resProfile.language) +
              '\n' +
              'pictureUrl:' +
              String(resProfile.pictureUrl) +
              '\n' +
              'statusMessage:' +
              String(resProfile.statusMessage) +
              '\n' +
              'userId:' +
              String(resProfile.userId),
          ),
        );
        break;

      case 'グループ概要':
        const resGroupOverView = await this._lineHandler.getGroupSummary(
          group.groupId,
        );
        await this._lineHandler.replyMessage(
          replyToken,
          textMessage(
            'グループID:' +
              resGroupOverView.groupId +
              '\n' +
              'グループ名:' +
              resGroupOverView.groupName +
              '\n' +
              'pictureUrl:' +
              resGroupOverView.pictureUrl,
          ),
        );
        break;

      case 'メンバー人数':
        const resMemeberCount = await this._lineHandler.getGroupMembersCount(
          group.groupId,
        );
        await this._lineHandler.replyMessage(
          replyToken,
          textMessage('人数:' + resMemeberCount.count),
        );
        break;

      case 'メッセージの送信数':
        const date = '20220201';
        const resMessageCount = <NumberOfMessageDeliveries>(
          await this._lineHandler.getNumberOfMessageDeliveries(date)
        );
        console.log(resMessageCount);
        await this._lineHandler.replyMessage(
          replyToken,
          textMessage(
            // '「ブロードキャストメッセージを送る」で送信されたメッセージの数:' +
            //   resMessageCount.apiBroadcast +
            //   '\n' +
            //   '「マルチキャストメッセージを送る」で送信されたメッセージの数:' +
            //   resMessageCount.apiMulticast +
            //   '\n' +
            //   '「プッシュメッセージを送る」で送信されたメッセージの数:' +
            //   resMessageCount.apiPush +
            //   '\n' +
            //   */
            // '「応答メッセージを送る」で送信されたメッセージの数:' +
            //   resMessageCount.apiReply,
            '\n' +
              '送信された応答メッセージの数:' +
              resMessageCount.autoResponse,
            // +'\n' +
            // 'ブロードキャストメッセージ:' +
            // resMessageCount.broadcast +
            // '\n' +
            // '「チャット基本画面」から送信されたメッセージの数: ' +
            // resMessageCount.chat +
            // '\n' +
            // 'ターゲティングメッセージ:' +
            // resMessageCount.targeting +
            // '\n' +
            // '送信されたあいさつメッセージの数:' +
            // resMessageCount.welcomeResponse,
          ),
        );
        break;

      case '友達数':
        const date1 = '20220201';
        const resFriends = <NumberOfFollowers>(
          await this._lineHandler.getNumberOfFollowers(date1)
        );
        await this._lineHandler.replyMessage(
          replyToken,
          textMessage(
            'フォロワー数:' +
              resFriends.followers +
              '\n' +
              '配信先となりうる友だちの総数:' +
              '\n' +
              resFriends.targetedReaches +
              '\n' +
              'アカウントをブロックしているユーザーの数:' +
              resFriends.blocks,
          ),
        );
        break;

      case 'Flex':
        await this._lineHandler.replyMessage(replyToken, {
          type: 'flex',
          altText: 'this is a flex message',
          contents: {
            type: 'bubble',
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: 'hello',
                },
                {
                  type: 'text',
                  text: 'world',
                },
              ],
            },
          },
        });
        break;

      case 'おやすみ':
        await this._lineHandler.replyMessage(replyToken, {
          type: 'sticker',
          packageId: '6325',
          stickerId: '10979927',
        });
        break;

      case '疲れた':
        await this._lineHandler.replyMessage(replyToken, {
          type: 'sticker',
          packageId: '6136',
          stickerId: '10551394',
        });
        break;

      case 'うんち！':
        await this._lineHandler.replyMessage(replyToken, {
          type: 'text',
          text: '$',
          emojis: [
            { index: 0, productId: '5ac221ca040ab15980c9b449', emojiId: '140' },
          ],
        });
        break;

      case 'メッセージ上限':
        const resLimitMessage =
          await this._lineHandler.getTargetLimitForAdditionalMessages();
        await this._lineHandler.replyMessage(
          replyToken,
          textMessage(
            'タイプ:' +
              resLimitMessage.type +
              '\n' +
              '値:' +
              resLimitMessage.value,
          ),
        );
        break;

      case 'メッセージ数_月':
        const resMessageCountMonth =
          await this._lineHandler.getNumberOfMessagesSentThisMonth();
        await this._lineHandler.replyMessage(
          replyToken,
          textMessage('値:' + resMessageCountMonth.totalUsage),
        );
        break;

      case '送信済み応答メッセージ':
        const sentDate = '20220201';
        const resNumberOfSentReplyMessages =
          await this._lineHandler.getNumberOfSentReplyMessages(sentDate);
        await this._lineHandler.replyMessage(
          replyToken,
          textMessage(
            // '状態:' +
            //   resNumberOfSentReplyMessages.status +
            //   '\n' +
            '値:' + resNumberOfSentReplyMessages.success,
          ),
        );
        break;

      case '送信済みプッシュメッセージ数':
        const sentpushMessageDate = '20220201';
        const resNumberOfSentPushMessages =
          await this._lineHandler.getNumberOfSentPushMessages(
            sentpushMessageDate,
          );
        await this._lineHandler.replyMessage(
          replyToken,
          textMessage(
            // '状態:' +
            //   resNumberOfSentPushMessages.status +
            //   '\n' +
            '値:' + resNumberOfSentPushMessages.success,
          ),
        );
        break;

      case '送信済みマルチキャストメッセージ数':
        const sentmultiCastMessageDate = '20220201';
        const resNumberOfSentMulticastMessages =
          await this._lineHandler.getNumberOfSentMulticastMessages(
            sentmultiCastMessageDate,
          );
        await this._lineHandler.replyMessage(
          replyToken,
          textMessage(
            // '状態:' +
            //   resNumberOfSentMulticastMessages.status +
            //   '\n' +
            '値:' + resNumberOfSentMulticastMessages.success,
          ),
        );
        break;

      case '送信済みブロードキャストメッセージ数':
        const sentBroadCastMessageDate = '20220201';
        const resNumberOfSentBroadcastMessages =
          await this._lineHandler.getNumberOfSentBroadcastMessages(
            sentBroadCastMessageDate,
          );
        await this._lineHandler.replyMessage(
          replyToken,
          textMessage(
            // '状態:' +
            //   resNumberOfSentBroadcastMessages.status +
            //   '\n' +
            '値:' + resNumberOfSentBroadcastMessages.success,
          ),
        );
        break;

      default:
        break;
    }
  }
}
