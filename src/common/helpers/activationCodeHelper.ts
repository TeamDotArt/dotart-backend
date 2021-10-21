import { v4 as uuidv4 } from 'uuid';
import { getHash } from './cipherHelper';

export const generateEmailToken = (): string => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};

export const generatePasswordToken = (userId: string): string => {
  const id = uuidv4();
  const date = Date.now().toString();
  const hash = getHash(`${id} : ${date} : ${userId}`);
  return hash;
};
