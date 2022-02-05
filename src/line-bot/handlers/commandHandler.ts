import {
  FlexCarousel,
  FlexMessage,
  Group,
  NumberOfFollowers,
  NumberOfMessageDeliveries,
  StickerMessage,
  TemplateMessage,
} from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';
import { textMessage } from '../messageTemplate/textMessage';
import { LineHandler } from './lineHandler';

@Injectable()
export class CommandHandler {
  constructor(private readonly _lineHandler: LineHandler) {}

  // 現在日を取得
  async formattedDateTime(date: Date) {
    const y = date.getFullYear();
    const m = ('0' + (date.getMonth() + 1)).slice(-2);
    const d = ('0' + date.getDate()).slice(-2);

    return y + m + d;
  }

  async uasgeEvacuation() {
    const commandMessage = {
      flexGoodmoning: 'おはよう',
      leave: '退会',
      hello: 'こんにちは',
      evening: 'こんばんは',
      goodBye: 'さようなら',
      stamp: 'スタンプ',
      cheers: '乾杯',
      janken: 'じゃんけん',
      dotartGame: 'ドット絵ゲーム',
      getProfile: 'メンバーのプロフィールを取得',
      groupOverView: 'グループ概要',
      memberCount: 'メンバー人数',
      numberOfMessageDeliveries: 'メッセージ送信数',
      friendCount: '友達数',
      goodNight: 'おやすみ',
      tired: '疲れた',
      messageLimit: 'メッセージ上限',
      messageCountMounth: 'メッセージ数_月',
      numberOfSentReplyMessages: '送信済み応答メッセージ',
      numberOfSentPushMessages: '送信済みプッシュメッセージ数',
      numberOfSentMulticastMessages: '送信済みマルチキャストメッセージ数',
      numberOfSentBroadcastMessages: '送信済みブロードキャストメッセージ数',
      application: 'アプリ',
    };

    const usageCarousel: FlexCarousel = {
      type: 'carousel',
      contents: [
        // 退会系コマンド一覧
        {
          type: 'bubble',
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: '退会系コマンド一覧',
                size: 'lg',
                offsetBottom: 'md',
                adjustMode: 'shrink-to-fit',
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `dotart ${commandMessage.leave}`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: '退会することができます',
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'button',
                        action: {
                          type: 'postback',
                          label: '実行',
                          data: `dotart ${commandMessage.leave}`,
                          displayText: `dotart ${commandMessage.leave}`,
                        },
                        style: 'primary',
                        height: 'sm',
                      },
                    ],
                    flex: 0,
                  },
                ],
                paddingBottom: 'md',
                paddingTop: 'md',
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `dotart ${commandMessage.goodBye}`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: '退会することができます',
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'button',
                        action: {
                          type: 'postback',
                          label: '実行',
                          data: `dotart ${commandMessage.goodBye}`,
                          displayText: `dotart ${commandMessage.goodBye}`,
                        },
                        style: 'primary',
                        height: 'sm',
                      },
                    ],
                    flex: 0,
                  },
                ],
                paddingBottom: 'md',
                paddingTop: 'md',
              },
            ],
          },
        },
        // FlexMessage系コマンド一覧
        {
          type: 'bubble',
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: 'FlexMessage系コマンド一覧',
                size: 'lg',
                offsetBottom: 'md',
                adjustMode: 'shrink-to-fit',
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `dotart ${commandMessage.flexGoodmoning}`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `FlexMessageで${commandMessage.flexGoodmoning}と表示`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'button',
                        action: {
                          type: 'postback',
                          label: '実行',
                          data: `dotart ${commandMessage.flexGoodmoning}`,
                          displayText: `dotart ${commandMessage.flexGoodmoning}`,
                        },
                        style: 'primary',
                        height: 'sm',
                      },
                    ],
                    flex: 0,
                  },
                ],
                paddingBottom: 'md',
                paddingTop: 'md',
              },
            ],
          },
        },
        // Message挨拶系コマンド一覧
        {
          type: 'bubble',
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: 'Message挨拶系コマンド一覧',
                size: 'lg',
                offsetBottom: 'md',
                adjustMode: 'shrink-to-fit',
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `dotart ${commandMessage.evening}`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `${commandMessage.evening}と表示`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'button',
                        action: {
                          type: 'postback',
                          label: '実行',
                          data: `dotart ${commandMessage.evening}`,
                          displayText: `dotart ${commandMessage.evening}`,
                        },
                        style: 'primary',
                        height: 'sm',
                      },
                    ],
                    flex: 0,
                  },
                ],
                paddingBottom: 'md',
                paddingTop: 'md',
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `dotart ${commandMessage.hello}`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `${commandMessage.hello}と表示`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'button',
                        action: {
                          type: 'postback',
                          label: '実行',
                          data: `dotart ${commandMessage.hello}`,
                          displayText: `dotart ${commandMessage.hello}`,
                        },
                        style: 'primary',
                        height: 'sm',
                      },
                    ],
                    flex: 0,
                  },
                ],
                paddingBottom: 'md',
                paddingTop: 'md',
              },
            ],
          },
        },
        // スタンプ系コマンド一覧
        {
          type: 'bubble',
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: 'スタンプ系コマンド一覧',
                size: 'lg',
                offsetBottom: 'md',
                adjustMode: 'shrink-to-fit',
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `dotart ${commandMessage.stamp}`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `${commandMessage.stamp}を表示`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'button',
                        action: {
                          type: 'postback',
                          label: '実行',
                          data: `dotart ${commandMessage.stamp}`,
                          displayText: `dotart ${commandMessage.stamp}`,
                        },
                        style: 'primary',
                        height: 'sm',
                      },
                    ],
                    flex: 0,
                  },
                ],
                paddingBottom: 'md',
                paddingTop: 'md',
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `dotart ${commandMessage.goodNight}`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `${commandMessage.goodNight}${commandMessage.stamp}を表示`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'button',
                        action: {
                          type: 'postback',
                          label: '実行',
                          data: `dotart ${commandMessage.goodNight}`,
                          displayText: `dotart ${commandMessage.goodNight}`,
                        },
                        style: 'primary',
                        height: 'sm',
                      },
                    ],
                    flex: 0,
                  },
                ],
                paddingBottom: 'md',
                paddingTop: 'md',
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `dotart ${commandMessage.cheers}`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `${commandMessage.cheers}${commandMessage.stamp}を表示`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'button',
                        action: {
                          type: 'postback',
                          label: '実行',
                          data: `dotart ${commandMessage.cheers}`,
                          displayText: `dotart ${commandMessage.cheers}`,
                        },
                        style: 'primary',
                        height: 'sm',
                      },
                    ],
                    flex: 0,
                  },
                ],
                paddingBottom: 'md',
                paddingTop: 'md',
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `dotart ${commandMessage.tired}`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `${commandMessage.tired}に対する${commandMessage.stamp}を表示`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'button',
                        action: {
                          type: 'postback',
                          label: '実行',
                          data: `dotart ${commandMessage.tired}`,
                          displayText: `dotart ${commandMessage.tired}`,
                        },
                        style: 'primary',
                        height: 'sm',
                      },
                    ],
                    flex: 0,
                  },
                ],
                paddingBottom: 'md',
                paddingTop: 'md',
              },
            ],
          },
        },
        // おまけ系コマンド一覧
        {
          type: 'bubble',
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: 'おまけ系コマンド一覧',
                size: 'lg',
                offsetBottom: 'md',
                adjustMode: 'shrink-to-fit',
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `dotart ${commandMessage.dotartGame}`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `おすすめの${commandMessage.dotartGame}を提案します`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'button',
                        action: {
                          type: 'postback',
                          label: '実行',
                          data: `dotart ${commandMessage.dotartGame}`,
                          displayText: `dotart ${commandMessage.dotartGame}`,
                        },
                        style: 'primary',
                        height: 'sm',
                      },
                    ],
                    flex: 0,
                  },
                ],
                paddingBottom: 'md',
                paddingTop: 'md',
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `dotart ${commandMessage.janken}`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `dotartと${commandMessage.janken}できます`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'button',
                        action: {
                          type: 'postback',
                          label: '実行',
                          data: `dotart ${commandMessage.janken}`,
                          displayText: `dotart ${commandMessage.janken}`,
                        },
                        style: 'primary',
                        height: 'sm',
                      },
                    ],
                    flex: 0,
                  },
                ],
                paddingBottom: 'md',
                paddingTop: 'md',
              },
            ],
          },
        },
        // 情報取得系(グループ)コマンド一覧
        {
          type: 'bubble',
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: '情報取得系(グループ)コマンド一覧',
                size: 'lg',
                offsetBottom: 'md',
                adjustMode: 'shrink-to-fit',
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `dotart ${commandMessage.getProfile}`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `${commandMessage.getProfile}を表示`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'button',
                        action: {
                          type: 'postback',
                          label: '実行',
                          data: `dotart ${commandMessage.getProfile}`,
                          displayText: `dotart ${commandMessage.getProfile}`,
                        },
                        style: 'primary',
                        height: 'sm',
                      },
                    ],
                    flex: 0,
                  },
                ],
                paddingBottom: 'md',
                paddingTop: 'md',
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `dotart ${commandMessage.groupOverView}`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `${commandMessage.groupOverView}を表示`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'button',
                        action: {
                          type: 'postback',
                          label: '実行',
                          data: `dotart ${commandMessage.groupOverView}`,
                          displayText: `dotart ${commandMessage.groupOverView}`,
                        },
                        style: 'primary',
                        height: 'sm',
                      },
                    ],
                    flex: 0,
                  },
                ],
                paddingBottom: 'md',
                paddingTop: 'md',
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `dotart ${commandMessage.memberCount}`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `${commandMessage.memberCount}を表示`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'button',
                        action: {
                          type: 'postback',
                          label: '実行',
                          data: `dotart ${commandMessage.memberCount}`,
                          displayText: `dotart ${commandMessage.memberCount}`,
                        },
                        style: 'primary',
                        height: 'sm',
                      },
                    ],
                    flex: 0,
                  },
                ],
                paddingBottom: 'md',
                paddingTop: 'md',
              },
            ],
          },
        },
        // 情報取得系(アカウント)コマンド一覧
        {
          type: 'bubble',
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: '情報取得系(アカウント)コマンド一覧',
                size: 'lg',
                offsetBottom: 'md',
                adjustMode: 'shrink-to-fit',
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `dotart ${commandMessage.numberOfMessageDeliveries}`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `${commandMessage.numberOfMessageDeliveries}を表示`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'button',
                        action: {
                          type: 'postback',
                          label: '実行',
                          data: `dotart ${commandMessage.numberOfMessageDeliveries}`,
                          displayText: `dotart ${commandMessage.numberOfMessageDeliveries}`,
                        },
                        style: 'primary',
                        height: 'sm',
                      },
                    ],
                    flex: 0,
                  },
                ],
                paddingBottom: 'md',
                paddingTop: 'md',
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `dotart ${commandMessage.friendCount}`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `${commandMessage.friendCount}を表示`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'button',
                        action: {
                          type: 'postback',
                          label: '実行',
                          data: `dotart ${commandMessage.friendCount}`,
                          displayText: `dotart ${commandMessage.friendCount}`,
                        },
                        style: 'primary',
                        height: 'sm',
                      },
                    ],
                    flex: 0,
                  },
                ],
                paddingBottom: 'md',
                paddingTop: 'md',
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `dotart ${commandMessage.messageLimit}`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `${commandMessage.messageLimit}を表示`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'button',
                        action: {
                          type: 'postback',
                          label: '実行',
                          data: `dotart ${commandMessage.messageLimit}`,
                          displayText: `dotart ${commandMessage.messageLimit}`,
                        },
                        style: 'primary',
                        height: 'sm',
                      },
                    ],
                    flex: 0,
                  },
                ],
                paddingBottom: 'md',
                paddingTop: 'md',
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `dotart ${commandMessage.messageCountMounth}`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `${commandMessage.messageCountMounth}を表示`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'button',
                        action: {
                          type: 'postback',
                          label: '実行',
                          data: `dotart ${commandMessage.messageCountMounth}`,
                          displayText: `dotart ${commandMessage.messageCountMounth}`,
                        },
                        style: 'primary',
                        height: 'sm',
                      },
                    ],
                    flex: 0,
                  },
                ],
                paddingBottom: 'md',
                paddingTop: 'md',
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `dotart ${commandMessage.numberOfSentPushMessages}`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `${commandMessage.numberOfSentPushMessages}を表示`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'button',
                        action: {
                          type: 'postback',
                          label: '実行',
                          data: `dotart ${commandMessage.numberOfSentPushMessages}`,
                          displayText: `dotart ${commandMessage.numberOfSentPushMessages}`,
                        },
                        style: 'primary',
                        height: 'sm',
                      },
                    ],
                    flex: 0,
                  },
                ],
                paddingBottom: 'md',
                paddingTop: 'md',
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `dotart ${commandMessage.numberOfSentMulticastMessages}`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `${commandMessage.numberOfSentMulticastMessages}を表示`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'button',
                        action: {
                          type: 'postback',
                          label: '実行',
                          data: `dotart ${commandMessage.numberOfSentMulticastMessages}`,
                          displayText: `dotart ${commandMessage.numberOfSentMulticastMessages}`,
                        },
                        style: 'primary',
                        height: 'sm',
                      },
                    ],
                    flex: 0,
                  },
                ],
                paddingBottom: 'md',
                paddingTop: 'md',
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `dotart ${commandMessage.numberOfSentBroadcastMessages}`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `${commandMessage.numberOfSentBroadcastMessages}を表示`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'button',
                        action: {
                          type: 'postback',
                          label: '実行',
                          data: `dotart ${commandMessage.numberOfSentBroadcastMessages}`,
                          displayText: `dotart ${commandMessage.numberOfSentBroadcastMessages}`,
                        },
                        style: 'primary',
                        height: 'sm',
                      },
                    ],
                    flex: 0,
                  },
                ],
                paddingBottom: 'md',
                paddingTop: 'md',
              },
            ],
          },
        },
        // dotart公式紹介系コマンド一覧
        {
          type: 'bubble',
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: 'dotart公式紹介系コマンド一覧',
                size: 'lg',
                offsetBottom: 'md',
                adjustMode: 'shrink-to-fit',
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `dotart ${commandMessage.application}`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                      {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                          {
                            type: 'text',
                            text: `dotartのweb${commandMessage.application}のリンクを表示`,
                            size: 'xxs',
                            adjustMode: 'shrink-to-fit',
                            gravity: 'center',
                          },
                        ],
                        flex: 1,
                        justifyContent: 'center',
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'button',
                        action: {
                          type: 'postback',
                          label: '実行',
                          data: `dotart ${commandMessage.application}`,
                          displayText: `dotart ${commandMessage.application}`,
                        },
                        style: 'primary',
                        height: 'sm',
                      },
                    ],
                    flex: 0,
                  },
                ],
                paddingBottom: 'md',
                paddingTop: 'md',
              },
            ],
          },
        },
      ],
    };
    const usageFlexMessage: FlexMessage = {
      type: 'flex',
      altText: 'this is a flex message',
      contents: usageCarousel,
    };
    return usageFlexMessage;
  }
  /*
  async usage() {
    const commandName = `コマンド名:`;
    const commandContents = `\n内容:`;
    const commandMessage = {
      flexGoodmoning: 'おはよう',
      leave: '退会',
      hello: 'こんにちは',
      evening: 'こんばんは',
      goodBye: 'さようなら',
      stamp: 'スタンプ',
      cheers: '乾杯',
      janken: 'じゃんけん',
      dotartGame: 'ドット絵ゲーム',
      getProfile: 'メンバーのプロフィールを取得',
    };
    const usageTemplateMessage: TemplateMessage = {
      type: 'template',
      altText: 'this is a carousel template',
      template: {
        type: 'carousel',
        columns: [
          {
            imageBackgroundColor: '#FFFFFF',
            title: '使い方',
            text:
              commandName +
              `dotart ${commandMessage.flexGoodmoning}` +
              commandContents +
              `flexMessageで${commandMessage.flexGoodmoning}と表示`,
            actions: [
              {
                type: 'postback',
                label: '実行',
                data: `dotart ${commandMessage.flexGoodmoning}`,
                displayText: `dotart ${commandMessage.flexGoodmoning}`,
              },
            ],
          },
          {
            imageBackgroundColor: '#FFFFFF',
            title: '使い方',
            text:
              commandName +
              `dotart ${commandMessage.leave}` +
              commandContents +
              `退会することができます`,
            actions: [
              {
                type: 'postback',
                label: '実行',
                data: `dotart ${commandMessage.leave}`,
                displayText: `dotart ${commandMessage.leave}`,
              },
            ],
          },
          {
            imageBackgroundColor: '#FFFFFF',
            title: '使い方',
            text:
              commandName +
              `dotart ${commandMessage.hello}` +
              commandContents +
              `flexMessageで${commandMessage.hello}と表示`,
            actions: [
              {
                type: 'postback',
                label: '実行',
                data: `dotart ${commandMessage.hello}`,
                displayText: `dotart ${commandMessage.hello}`,
              },
            ],
          },
          {
            imageBackgroundColor: '#FFFFFF',
            title: '使い方',
            text:
              commandName +
              `dotart ${commandMessage.evening}` +
              commandContents +
              `flexMessageで${commandMessage.evening}と表示`,
            actions: [
              {
                type: 'postback',
                label: '実行',
                data: `dotart ${commandMessage.evening}`,
                displayText: `dotart ${commandMessage.evening}`,
              },
            ],
          },
          {
            imageBackgroundColor: '#FFFFFF',
            title: '使い方',
            text:
              commandName +
              `dotart ${commandMessage.goodBye}` +
              commandContents +
              `退会することができます`,
            actions: [
              {
                type: 'postback',
                label: '実行',
                data: `dotart ${commandMessage.goodBye}`,
                displayText: `dotart ${commandMessage.goodBye}`,
              },
            ],
          },
          {
            imageBackgroundColor: '#FFFFFF',
            title: '使い方',
            text:
              commandName +
              `dotart ${commandMessage.stamp}` +
              commandContents +
              `${commandMessage.stamp}を表示`,
            actions: [
              {
                type: 'postback',
                label: '実行',
                data: `dotart ${commandMessage.stamp}`,
                displayText: `dotart ${commandMessage.stamp}`,
              },
            ],
          },
          {
            imageBackgroundColor: '#FFFFFF',
            title: '使い方',
            text:
              commandName +
              `dotart ${commandMessage.cheers}` +
              commandContents +
              `${commandMessage.cheers}${commandMessage.stamp}を表示`,
            actions: [
              {
                type: 'postback',
                label: '実行',
                data: `dotart ${commandMessage.cheers}`,
                displayText: `dotart ${commandMessage.cheers}`,
              },
            ],
          },
          {
            imageBackgroundColor: '#FFFFFF',
            title: '使い方',
            text:
              commandName +
              `dotart ${commandMessage.janken}` +
              commandContents +
              `dotartと${commandMessage.janken}できます`,
            actions: [
              {
                type: 'postback',
                label: '実行',
                data: `dotart ${commandMessage.janken}`,
                displayText: `dotart ${commandMessage.janken}`,
              },
            ],
          },
          {
            imageBackgroundColor: '#FFFFFF',
            title: '使い方',
            text:
              commandName +
              `dotart ${commandMessage.dotartGame}` +
              commandContents +
              `おすすめの${commandMessage.dotartGame}を表示`,
            actions: [
              {
                type: 'postback',
                label: '実行',
                data: `dotart ${commandMessage.dotartGame}`,
                displayText: `dotart ${commandMessage.dotartGame}`,
              },
            ],
          },
          {
            imageBackgroundColor: '#FFFFFF',
            title: '使い方',
            text:
              commandName +
              `dotart ${commandMessage.getProfile}` +
              commandContents +
              `${commandMessage.getProfile}を表示`,
            actions: [
              {
                type: 'postback',
                label: '実行',
                data: `dotart ${commandMessage.getProfile}`,
                displayText: `dotart ${commandMessage.getProfile}`,
              },
            ],
          },
        ],
      },
    };
    return usageTemplateMessage;
  }

  async usage2() {
    const commandName = `コマンド名:`;
    const commandContents = `\n内容:`;
    const commandMessage = {
      groupOverView: 'グループ概要',
      memberCount: 'メンバー人数',
      friendCount: '友達数',
      GoodNight: 'おやすみ',
      tired: '疲れた',
      poo: 'うんち',
      messageLimit: 'メッセージ上限',
      messageCountMounth: 'メッセージ数_月',
      numberOfSentReplyMessages: '送信済み応答メッセージ',
      numberOfSentPushMessages: '送信済みプッシュメッセージ数',
      numberOfSentMulticastMessages: '送信済みマルチキャストメッセージ数',
    };
    const usageTemplateMessage2: TemplateMessage = {
      type: 'template',
      altText: 'this is a carousel template',
      template: {
        type: 'carousel',
        columns: [
          {
            imageBackgroundColor: '#FFFFFF',
            title: '使い方',
            text:
              commandName +
              `dotart ${commandMessage.groupOverView}` +
              commandContents +
              `${commandMessage.groupOverView}を表示`,
            actions: [
              {
                type: 'postback',
                label: '実行',
                data: `dotart ${commandMessage.groupOverView}`,
                displayText: `dotart ${commandMessage.groupOverView}`,
              },
            ],
          },
          {
            imageBackgroundColor: '#FFFFFF',
            title: '使い方',
            text:
              commandName +
              `dotart ${commandMessage.memberCount}` +
              commandContents +
              `${commandMessage.memberCount}を表示`,
            actions: [
              {
                type: 'postback',
                label: '実行',
                data: `dotart ${commandMessage.memberCount}`,
                displayText: `dotart ${commandMessage.memberCount}`,
              },
            ],
          },
          {
            imageBackgroundColor: '#FFFFFF',
            title: '使い方',
            text:
              commandName +
              `dotart ${commandMessage.friendCount}` +
              commandContents +
              `${commandMessage.friendCount}を表示`,
            actions: [
              {
                type: 'postback',
                label: '実行',
                data: `dotart ${commandMessage.friendCount}`,
                displayText: `dotart ${commandMessage.friendCount}`,
              },
            ],
          },
          {
            imageBackgroundColor: '#FFFFFF',
            title: '使い方',
            text:
              commandName +
              `dotart ${commandMessage.GoodNight}` +
              commandContents +
              `${commandMessage.GoodNight}スタンプを表示`,
            actions: [
              {
                type: 'postback',
                label: '実行',
                data: `dotart ${commandMessage.GoodNight}`,
                displayText: `dotart ${commandMessage.GoodNight}`,
              },
            ],
          },
          {
            imageBackgroundColor: '#FFFFFF',
            title: '使い方',
            text:
              commandName +
              `dotart ${commandMessage.tired}` +
              commandContents +
              `${commandMessage.tired}に対するスタンプを表示`,
            actions: [
              {
                type: 'postback',
                label: '実行',
                data: `dotart ${commandMessage.tired}`,
                displayText: `dotart ${commandMessage.tired}`,
              },
            ],
          },
          {
            imageBackgroundColor: '#FFFFFF',
            title: '使い方',
            text:
              commandName +
              `dotart ${commandMessage.messageLimit}` +
              commandContents +
              `${commandMessage.messageLimit}を表示`,
            actions: [
              {
                type: 'postback',
                label: '実行',
                data: `dotart ${commandMessage.messageLimit}`,
                displayText: `dotart ${commandMessage.messageLimit}`,
              },
            ],
          },
          {
            imageBackgroundColor: '#FFFFFF',
            title: '使い方',
            text:
              commandName +
              `dotart ${commandMessage.messageCountMounth}` +
              commandContents +
              `${commandMessage.messageCountMounth}を表示`,
            actions: [
              {
                type: 'postback',
                label: '実行',
                data: `dotart ${commandMessage.messageCountMounth}`,
                displayText: `dotart ${commandMessage.messageCountMounth}`,
              },
            ],
          },
          {
            imageBackgroundColor: '#FFFFFF',
            title: '使い方',
            text:
              commandName +
              `dotart ${commandMessage.numberOfSentReplyMessages}` +
              commandContents +
              `${commandMessage.numberOfSentReplyMessages}を表示`,
            actions: [
              {
                type: 'postback',
                label: '実行',
                data: `dotart ${commandMessage.numberOfSentReplyMessages}`,
                displayText: `dotart ${commandMessage.numberOfSentReplyMessages}`,
              },
            ],
          },
          {
            imageBackgroundColor: '#FFFFFF',
            title: '使い方',
            text:
              commandName +
              `dotart ${commandMessage.numberOfSentPushMessages}` +
              commandContents +
              `${commandMessage.numberOfSentPushMessages}を表示`,
            actions: [
              {
                type: 'postback',
                label: '実行',
                data: `dotart ${commandMessage.numberOfSentPushMessages}`,
                displayText: `dotart ${commandMessage.numberOfSentPushMessages}`,
              },
            ],
          },
          {
            imageBackgroundColor: '#FFFFFF',
            title: '使い方',
            text:
              commandName +
              `dotart ${commandMessage.numberOfSentMulticastMessages}` +
              commandContents +
              `${commandMessage.numberOfSentMulticastMessages}を表示`,
            actions: [
              {
                type: 'postback',
                label: '実行',
                data: `dotart ${commandMessage.numberOfSentMulticastMessages}`,
                displayText: `dotart ${commandMessage.numberOfSentMulticastMessages}`,
              },
            ],
          },
        ],
      },
    };
    return usageTemplateMessage2;
  }

  async usage3() {
    const commandName = `コマンド名:`;
    const commandContents = `\n内容:`;
    const commandMessage = {
      numberOfSentBroadcastMessages: '送信済みブロードキャストメッセージ数',
      application: 'アプリ',
    };
    const usageTemplateMessage3: TemplateMessage = {
      type: 'template',
      altText: 'this is a carousel template',
      template: {
        type: 'carousel',
        columns: [
          {
            imageBackgroundColor: '#FFFFFF',
            title: '使い方',
            text:
              commandName +
              `dotart ${commandMessage.numberOfSentBroadcastMessages}` +
              commandContents +
              `${commandMessage.numberOfSentBroadcastMessages}を表示`,
            actions: [
              {
                type: 'postback',
                label: '実行',
                data: `dotart ${commandMessage.numberOfSentBroadcastMessages}`,
                displayText: `dotart ${commandMessage.numberOfSentBroadcastMessages}`,
              },
            ],
          },
          {
            imageBackgroundColor: '#FFFFFF',
            title: '使い方',
            text:
              commandName +
              `dotart ${commandMessage.application}` +
              commandContents +
              `${commandMessage.application}を表示`,
            actions: [
              {
                type: 'postback',
                label: '実行',
                data: `dotart ${commandMessage.application}`,
                displayText: `dotart ${commandMessage.application}`,
              },
            ],
          },
        ],
      },
    };
    return usageTemplateMessage3;
  }
*/
  async goodMooning() {
    const flexGoodmooning: FlexMessage = {
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
              text: 'おはようございます!',
            },
          ],
        },
      },
    };
    return flexGoodmooning;
  }

  async Hello() {
    const hello = textMessage('こんにちは!');
    return hello;
  }

  async goodEvening() {
    const evening = textMessage('こんばんは!');
    return evening;
  }

  async stamp() {
    const stamp: StickerMessage = {
      type: 'sticker',
      packageId: '11538',
      stickerId: '51626494',
    };
    return stamp;
  }

  async cheers() {
    const cherrsStamp: StickerMessage = {
      type: 'sticker',
      packageId: '2',
      stickerId: '28',
    };
    return cherrsStamp;
  }

  async janken() {
    const jankenList = ['グー', 'チョキ', 'パー'];
    const janken = jankenList[Math.floor(Math.random() * jankenList.length)]; // じゃんけんリストからランダムに要素を取得
    console.log(janken);
    const jankenTemple: TemplateMessage = {
      type: 'template',
      altText: 'じゃんけんをレコメンドします',
      template: {
        type: 'buttons',
        text: `最初はグー、じゃんけん…`,
        actions: [
          {
            type: 'message',
            label: jankenList[0],
            text: `あなたは${jankenList[0]}を出しました！\ndotartは${janken}を出しました！`,
          },
          {
            type: 'message',
            label: jankenList[1],
            text: `あなたは${jankenList[1]}を出しました！\ndotartは${janken}を出しました！`,
          },
          {
            type: 'message',
            label: jankenList[2],
            text: `あなたは${jankenList[2]}を出しました！\ndotartは${janken}を出しました！`,
          },
        ],
      },
    };
    return jankenTemple;
  }

  async dotartGame() {
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
    const dotartGame: TemplateMessage = {
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
    };
    return dotartGame;
  }

  async getProfile(replyToken: string, group: Group) {
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
  }

  async groupOverView(replyToken: string, group: Group) {
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
  }

  async getMemberCount(replyToken: string, group: Group) {
    const resMemeberCount = await this._lineHandler.getGroupMembersCount(
      group.groupId,
    );
    await this._lineHandler.replyMessage(
      replyToken,
      textMessage('人数:' + resMemeberCount.count),
    );
  }

  async NumberOfMessageDeliveries(replyToken: string) {
    const date = '20220201';
    const resMessageCount = <NumberOfMessageDeliveries>(
      await this._lineHandler.getNumberOfMessageDeliveries(date)
    );
    console.log(resMessageCount);
    await this._lineHandler.replyMessage(
      replyToken,
      textMessage(
        '「ブロードキャストメッセージを送る」で送信されたメッセージの数:' +
          resMessageCount.apiBroadcast +
          '\n' +
          '「マルチキャストメッセージを送る」で送信されたメッセージの数:' +
          resMessageCount.apiMulticast +
          '\n' +
          '「プッシュメッセージを送る」で送信されたメッセージの数:' +
          resMessageCount.apiPush +
          '\n' +
          '「応答メッセージを送る」で送信されたメッセージの数:' +
          resMessageCount.apiReply +
          '\n' +
          '送信された応答メッセージの数:' +
          resMessageCount.autoResponse +
          '\n' +
          'ブロードキャストメッセージ:' +
          resMessageCount.broadcast +
          '\n' +
          '「チャット基本画面」から送信されたメッセージの数: ' +
          resMessageCount.chat +
          '\n' +
          'ターゲティングメッセージ:' +
          resMessageCount.targeting +
          '\n' +
          '送信されたあいさつメッセージの数:' +
          resMessageCount.welcomeResponse,
      ),
    );
  }

  async friendCount(replyToken: string) {
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
          '配信先となりうる友だち数:' +
          '\n' +
          resFriends.targetedReaches +
          '\n' +
          'アカウントをブロックしているユーザー数:' +
          resFriends.blocks,
      ),
    );
  }

  async goodNightStamp(replyToken) {
    await this._lineHandler.replyMessage(replyToken, {
      type: 'sticker',
      packageId: '6325',
      stickerId: '10979927',
    });
  }

  async tiredStamp(replyToken) {
    await this._lineHandler.replyMessage(replyToken, {
      type: 'sticker',
      packageId: '6136',
      stickerId: '10551394',
    });
  }

  async pooStamp(replyToken) {
    await this._lineHandler.replyMessage(replyToken, {
      type: 'text',
      text: '$',
      emojis: [
        { index: 0, productId: '5ac221ca040ab15980c9b449', emojiId: '140' },
      ],
    });
  }

  async messaageLimit(replyToken) {
    const resLimitMessage =
      await this._lineHandler.getTargetLimitForAdditionalMessages();
    await this._lineHandler.replyMessage(
      replyToken,
      textMessage(
        'タイプ:' + resLimitMessage.type + '\n' + '値:' + resLimitMessage.value,
      ),
    );
  }

  async messageCountMonth(replyToken) {
    const resMessageCountMonth =
      await this._lineHandler.getNumberOfMessagesSentThisMonth();
    await this._lineHandler.replyMessage(
      replyToken,
      textMessage('値:' + resMessageCountMonth.totalUsage),
    );
  }

  async NumberOfSentReplyMessages(replyToken) {
    const now = new Date();
    const currentTime = this.formattedDateTime(now);
    const intCurrentTime = parseInt(await currentTime) - 1; // 前日
    const sentDate = intCurrentTime.toString();
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
  }

  async NumberOfSentPushMessages(replyToken) {
    const now = new Date();
    const currentTime = this.formattedDateTime(now);
    const intCurrentTime = parseInt(await currentTime) - 1; // 前日
    const sentDate = intCurrentTime.toString();
    const resNumberOfSentPushMessages =
      await this._lineHandler.getNumberOfSentPushMessages(sentDate);
    await this._lineHandler.replyMessage(
      replyToken,
      textMessage(
        // '状態:' +
        //   resNumberOfSentPushMessages.status +
        //   '\n' +
        '値:' + resNumberOfSentPushMessages.success,
      ),
    );
  }

  async NumberOfSentMulticastMessages(replyToken) {
    const now = new Date();
    const currentTime = this.formattedDateTime(now);
    const intCurrentTime = parseInt(await currentTime) - 1; // 前日
    const sentDate = intCurrentTime.toString();
    const resNumberOfSentMulticastMessages =
      await this._lineHandler.getNumberOfSentMulticastMessages(sentDate);
    await this._lineHandler.replyMessage(
      replyToken,
      textMessage(
        // '状態:' +
        //   resNumberOfSentMulticastMessages.status +
        //   '\n' +
        '値:' + resNumberOfSentMulticastMessages.success,
      ),
    );
  }

  async NumberOfSentBroadcastMessages(replyToken) {
    const now = new Date();
    const currentTime = this.formattedDateTime(now);
    const intCurrentTime = parseInt(await currentTime) - 1; // 前日
    const sentDate = intCurrentTime.toString();
    const resNumberOfSentBroadcastMessages =
      await this._lineHandler.getNumberOfSentBroadcastMessages(sentDate);
    await this._lineHandler.replyMessage(
      replyToken,
      textMessage(
        // '状態:' +
        //   resNumberOfSentBroadcastMessages.status +
        //   '\n' +
        '値:' + resNumberOfSentBroadcastMessages.success,
      ),
    );
  }

  async application(replyToken) {
    const text = `DotArt公式アカウントです！\nhttps://dotart.riml.work\n\ndotart 使い方\nと送信することでアクションを確認できます。\nぜひ楽しんでいただけたら嬉しいです！`;
    this._lineHandler.replyMessage(replyToken, textMessage(text));
  }
}
