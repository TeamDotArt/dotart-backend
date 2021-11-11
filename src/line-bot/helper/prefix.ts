import { Constants } from '../../common/constants';

export const prefix = (text: string): boolean => {
  Constants.LINE_BOT_PREFIX.forEach((prefix) => {
    if (text.startsWith(prefix)) {
      return true;
    }
  });
  return false;
};
