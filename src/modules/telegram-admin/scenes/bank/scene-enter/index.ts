import { SceneContext } from 'telegraf/typings/scenes';
import { generateBankSceneInlineKeyboard } from './inline-keyboard';

const generateText = () => {
  const text = `
CHOOSE ACTIONS`;

  return text;
};

interface IAdminBankSceneEnterArgs {
  ctx: SceneContext;
}
export const adminBankSceneEnter = async (args: IAdminBankSceneEnterArgs) => {
  const { ctx } = args;

  const text = generateText();
  const inline_keyboard = generateBankSceneInlineKeyboard();

  await ctx.replyWithHTML(text, { reply_markup: { inline_keyboard } });
};
