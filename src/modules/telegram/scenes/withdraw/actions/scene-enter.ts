import { EBanks } from 'src/modules/bank/shared/types';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { SceneContext } from 'telegraf/typings/scenes';

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
    { text: EBanks.MBANK, callback_data: EBanks.MBANK },
    { text: EBanks.OPTIMA, callback_data: EBanks.OPTIMA },
  ]);

  inline_keyboard.push([
    { text: EBanks.BAKAI_BANK, callback_data: EBanks.BAKAI_BANK },
    { text: EBanks.COMPONION, callback_data: EBanks.COMPONION },
  ]);

  inline_keyboard.push([
    { text: EBanks.O_MONEY, callback_data: EBanks.O_MONEY },
    { text: EBanks.QRCODE, callback_data: EBanks.QRCODE },
  ]);

  return inline_keyboard;
};

interface ISceneEnterArgs {
  ctx: SceneContext;
}
export const withdrawSceneEnter = async (args: ISceneEnterArgs) => {
  const { ctx } = args;

  const text = generateText();
  const subText = generateSubText();
  const inline_keyboard = generateInlineKeyboard();

  await ctx.replyWithHTML(text);
  await ctx.replyWithHTML(subText, { reply_markup: { inline_keyboard } });
};
