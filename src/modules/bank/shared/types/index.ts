export enum EBanks {
  MBANK = 'MBANK',
  COMPONION = 'COMPONION',
  O_MONEY = 'O_MONEY',
  OPTIMA = 'OPTIMA',
  BAKAI_BANK = 'BAKAI_BANK',
  QRCODE = 'QRCODE',
  MEGAPAY = 'MEGAPAY',
  BALANCE = 'BALANCE',
}

export const EBANK_TEXT: Record<EBanks, string> = {
  [EBanks.MBANK]: 'MBANK',
  [EBanks.COMPONION]: 'Компаньон',
  [EBanks.O_MONEY]: 'О!Деньги',
  [EBanks.OPTIMA]: 'Optima',
  [EBanks.BAKAI_BANK]: 'Бакай Банк',
  [EBanks.QRCODE]: 'QR-перевод',
  [EBanks.MEGAPAY]: 'MegaPay',
  [EBanks.BALANCE]: 'Balance',
};
