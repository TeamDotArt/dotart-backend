import { Message, TextMessage } from '@line/bot-sdk';

export const textMessage = (text: string): TextMessage => {
  const message: Message = {
    type: 'text',
    text: text,
  };
  return message;
};
