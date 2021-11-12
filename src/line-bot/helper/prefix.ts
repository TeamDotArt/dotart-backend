import { Constants } from '../../common/constants';

export const prefix = (text: string): boolean => {
  let cmdFlg = false;
  Constants.LINE_BOT_PREFIX.forEach((prefix) => {
    if (text === prefix) {
      cmdFlg = true;
    }
  });
  return cmdFlg;
};
