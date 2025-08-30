import { Bank } from 'src/modules/bank/entities/bank.entity';
import {
  generateBakaiQrCodeUrl,
  generateBalanceQrCodeUrl,
  generateMbankQrCodeUrl,
  generateMegaPayQrCodeUrl,
  generateOMoneyQrCodeUrl,
} from './bank';
import { EBanks } from 'src/modules/bank/shared/types';

interface IGeneratePriceArgs {
  bank: Bank;
}
export const generatePrice = (args: IGeneratePriceArgs) => {
  const { bank } = args;

  const replace_url = bank.href;
  const hash = bank.link_hash;

  const banksToQrCodeUrl = {
    [EBanks.MBANK]: generateMbankQrCodeUrl({
      replace_url,
      hash,
    }),
    [EBanks.O_MONEY]: generateOMoneyQrCodeUrl({
      replace_url,
      hash,
    }),
    [EBanks.MEGAPAY]: generateMegaPayQrCodeUrl({
      replace_url,
      hash,
    }),
    [EBanks.BALANCE]: generateBalanceQrCodeUrl({
      replace_url,
      hash,
    }),
    [EBanks.BAKAI_BANK]: generateBakaiQrCodeUrl({
      replace_url,
      hash,
    }),
  };

  return banksToQrCodeUrl;
};

export const generateNumberPrice = (price: number) => {
  // return price.toFixed(0);
  const generatedPrice = typeof price === 'string' ? parseFloat(price) : price;
  const cents = Math.floor(Math.random() * 100);
  const priceWithCents = generatedPrice + cents / 100;
  const fixedPriceWithCents = priceWithCents.toFixed(2);
  return fixedPriceWithCents;
};
