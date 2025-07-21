import { SceneContext } from 'telegraf/typings/scenes';
import { IReplenishSession } from '../../session';
import {
  InlineKeyboardButton,
  KeyboardButton,
} from 'telegraf/typings/core/types/typegram';
import { TELEGRAM_ACTION_KEYBOARDS } from 'src/modules/telegram/actions/keyboard';
import { BankService } from 'src/modules/bank/bank.service';
import { generateNumberPrice, generatePrice } from './generate';
import { QrcodeService } from 'src/helpers/qrcode/qrcode.service';

const generateText = () => {
  return `
📎 <b>Отправьте чек об оплате</b>

Прикрепите скриншот или фото подтверждения платежа. 
После проверки баланс будет пополнен.
  `;
};

interface IGenerateSubTextArgs {
  price: string;
}
const generateSubText = (args: IGenerateSubTextArgs) => {
  const { price } = args;
  const text = `
🔹 <b>Сумма:</b> ${price} 
⏳ <i>Активно в течение 15 минут</i>
`;

  return text;
};

const generateKeyboard = () => {
  const keyboard: KeyboardButton[][] = [];

  keyboard.push([{ text: TELEGRAM_ACTION_KEYBOARDS.MAIN }]);

  return keyboard;
};

interface IGeneSubKeyboardArgs {
  bankService: BankService;
}
const generateSubKeyboard = (args: IGeneSubKeyboardArgs) => {
  const { bankService } = args;

  const keyboard: InlineKeyboardButton[][] = [];

  const bank = bankService.bank;

  const prices = generatePrice({ bank });

  for (const bankKey of Object.keys(prices)) {
    const bankQrCodeUrl = prices[bankKey] as string;

    // Проверяем, что банк существует и есть link
    if (bankQrCodeUrl) {
      keyboard.push([
        {
          text: bankKey,
          url: bankQrCodeUrl,
        },
      ]);
    }
  }

  const chunkedKeyboard: InlineKeyboardButton[][] = [];
  for (let i = 0; i < keyboard.length; i += 2) {
    const row = keyboard.slice(i, i + 2).flat();
    chunkedKeyboard.push(row);
  }

  return chunkedKeyboard;
};

interface IPriceArgs {
  ctx: SceneContext;
  text: string;
  session: IReplenishSession;
  bankService: BankService;
  qrcodeService: QrcodeService;
}
export const replenishMessagePrice = async (args: IPriceArgs) => {
  const { ctx, session, text, bankService, qrcodeService } = args;

  const generatedPrice = generateNumberPrice(Number(text));

  session.price = generatedPrice;

  const replyText = generateText();
  const replySubText = generateSubText({ price: generatedPrice });

  const keyboard = generateKeyboard();
  const subKeyboard = generateSubKeyboard({ bankService });

  const bank = bankService.bank;

  const bufferImage = await qrcodeService.generateQRCodeBuffer({
    url: bank.href,
  });

  await ctx.replyWithPhoto(
    { source: bufferImage },
    {
      reply_markup: { inline_keyboard: subKeyboard },
    },
  );

  await ctx.replyWithHTML(replyText, {
    reply_markup: { keyboard, resize_keyboard: true },
  });
};
