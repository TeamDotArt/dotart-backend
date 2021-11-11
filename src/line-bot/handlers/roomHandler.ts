import { Injectable } from '@nestjs/common';
import { LineHandler } from './lineHandler';

@Injectable()
export class RoomHandler {
  constructor(private readonly lineHandler: LineHandler) {}

  // RoomEvent
  async roomEvent(room_id: string): Promise<void> {
    await this.lineHandler.leaveChat(room_id);
  }
}
