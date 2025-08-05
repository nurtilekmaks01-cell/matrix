import { EBANK_TEXT, EBanks } from 'src/modules/bank/shared/types';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { SceneContext } from 'telegraf/typings/scenes';
import { clearWithdrawSession, IWithdrawSession } from '../session';
import { TELEGRAM_ACTION_KEYBOARDS } from 'src/modules/telegram/actions/keyboard';

const generateText = () => {
  const text = `
Укажите удобный вам способ пополнения счета
`;

  return text;
};

const generateSubText = () => {
  const text = `
Выберите способ вывода средств
`;

  return text;
};

const generateInlineKeyboard = () => {
  const inline_keyboard: InlineKeyboardButton[][] = [];

  inline_keyboard.push([
    { text: EBANK_TEXT[EBanks.MBANK], callback_data: EBanks.MBANK },
    { text: EBANK_TEXT[EBanks.OPTIMA], callback_data: EBanks.OPTIMA },
  ]);

  inline_keyboard.push([
    { text: EBANK_TEXT[EBanks.BAKAI_BANK], callback_data: EBanks.BAKAI_BANK },
    { text: EBANK_TEXT[EBanks.COMPONION], callback_data: EBanks.COMPONION },
  ]);

  inline_keyboard.push([
    { text: EBANK_TEXT[EBanks.O_MONEY], callback_data: EBanks.O_MONEY },
    { text: EBANK_TEXT[EBanks.QRCODE], callback_data: EBanks.QRCODE },
  ]);

  inline_keyboard.push([
    {
      text: TELEGRAM_ACTION_KEYBOARDS.CANCELED,
      callback_data: TELEGRAM_ACTION_KEYBOARDS.CANCELED,
    },
  ]);

  return inline_keyboard;
};

interface ISceneEnterArgs {
  ctx: SceneContext;
}
export const withdrawSceneEnter = async (args: ISceneEnterArgs) => {
  const { ctx } = args;
  const session = ctx.session as IWithdrawSession;

  const text = generateText();
  const subText = generateSubText();
  const inline_keyboard = generateInlineKeyboard();

  await ctx.replyWithHTML(text);
  await ctx.replyWithHTML(subText, { reply_markup: { inline_keyboard } });
  clearWithdrawSession(session);
};
