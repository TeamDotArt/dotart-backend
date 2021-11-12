import { ImageMapMessage, Message } from '@line/bot-sdk';

export const imageMapMessage = (
  imgUrl: string,
  linkUri: string,
  altText: string,
  width = 1040,
  height = 1040,
): ImageMapMessage => {
  const message: Message = {
    type: 'imagemap',
    baseUrl: imgUrl,
    altText: altText,
    baseSize: {
      width: width,
      height: height,
    },
    actions: [
      {
        type: 'uri',
        linkUri: linkUri,
        area: {
          x: 0,
          y: 0,
          width: width,
          height: height,
        },
      },
    ],
  };
  return message;
};
