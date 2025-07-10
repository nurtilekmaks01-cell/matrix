import { SceneContext } from 'telegraf/typings/scenes';
import { adminStartInlineKeyboard } from './helpers/inline-keyboard';

const generateText = () => {
  const text = `
CHOOSE ACTIONS`;

  return text;
};

interface IAdminStartArgs {
  ctx: SceneContext;
}
export const adminOnStart = async (args: IAdminStartArgs) => {
  const { ctx } = args;

  const text = generateText();
  const inline_keyboard = await adminStartInlineKeyboard();

  await ctx.replyWithHTML(text, { reply_markup: { inline_keyboard } });
};
