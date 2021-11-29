import { Injectable } from '@nestjs/common';
import { WebhookEvent } from '@line/bot-sdk';
// Handler
import { FollowHandler } from './handlers/followHandler';
import { GroupHandler } from './handlers/groupHandler';
import { JoinHandler } from './handlers/joinHandler';
import { RoomHandler } from './handlers/roomHandler';
import { UserHandler } from './handlers/userHandler';
// Types
import { EventTypes } from './types/event';
import { SourceTypes } from './types/source';

@Injectable()
export class LineBotService {
  constructor(
    private readonly _followHandler: FollowHandler,
    private readonly _joinHandler: JoinHandler,
    private readonly _userHandler: UserHandler,
    private readonly _groupHandler: GroupHandler,
    private readonly _roomHandler: RoomHandler,
  ) {}

  // eventHandler
  async run(events: WebhookEvent): Promise<void> {
    if (!events) {
      return;
    }
    console.log(events);
    switch (events.type) {
      case EventTypes.MESSAGE:
        if (events.source.type === SourceTypes.USER) {
          await this._userHandler.userEvent(events);
        } else if (events.source.type === SourceTypes.GROUP) {
          await this._groupHandler.groupEvent(events);
        } else if (events.source.type === SourceTypes.ROOM) {
          await this._roomHandler.roomEvent(events);
        }
        break;

      // トーク取り消し
      case EventTypes.UN_SEND:
        console.log('Event -> un_send');
        break;

      // 友達追加された
      case EventTypes.FOLLOW:
        this._followHandler.followEvent(events);
        break;

      // ブロックまたは削除された
      case EventTypes.UN_FOLLOW:
        console.log('Event -> un_follow');
        break;

      // 自分がグループに参加した
      case EventTypes.JOIN:
        await this._joinHandler.joinEvent(events);
        break;

      // 自分がグループから退出した
      case EventTypes.LEAVE:
        console.log('Event -> leave');
        break;

      // 誰かがグループに参加した
      case EventTypes.MEMBER_JOINED:
        console.log('Event -> memberJoined');
        break;

      // 誰かがグループから退出した
      case EventTypes.MEMBER_LEFT:
        console.log('Event -> memberLeft');
        break;

      // Postback
      case EventTypes.POSTBACK:
        console.log('Event -> postback');
        break;

      default:
        console.log(events);
        break;
    }
  }
}
