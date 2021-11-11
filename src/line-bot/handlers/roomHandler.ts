import { Injectable } from '@nestjs/common';
import { MessageEvent, Room } from '@line/bot-sdk';
import { LineHandler } from './lineHandler';
import { MessageTypes } from '../types/message';
import { prefix } from '../helper/prefix';

@Injectable()
export class RoomHandler {
  constructor(private readonly lineHandler: LineHandler) {}

  // RoomEvent
  async roomEvent(event: MessageEvent): Promise<void> {
    const { message, source } = event;
    if (!(message.type === MessageTypes.TEXT)) {
      return;
    }
    const messageObj = message.text.split(' ');
    if (!prefix(messageObj[0])) {
      return;
    }
    // room情報
    const room = source as Room;
    await this.lineHandler.leaveChat(room.roomId);
  }
}
