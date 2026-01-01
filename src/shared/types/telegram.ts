export interface ITelegram {
  bot_starting: boolean;
}

export enum EBookmakers {
  XBET = 'XBET',
  MELBET = 'MELBET',
  MOSTBET = 'MOSTBET',
  WIN = '1WIN',
}

export const BOOKMAKER_TEXT = {
  [EBookmakers.MELBET]: 'MELBET',
  [EBookmakers.XBET]: '1XBET',
};
