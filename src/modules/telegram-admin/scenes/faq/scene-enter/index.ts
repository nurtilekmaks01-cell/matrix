import { SceneContext } from 'telegraf/typings/scenes';
import { generateFaqSceneInlineKeyboard } from './inline-keyboard';

const generateText = () => {
  const text = `
CHOOSE ACTIONS`;

  return text;
};

interface IAdminFaqSceneEnterArgs {
  ctx: SceneContext;
}
export const adminFaqSceneEnter = async (args: IAdminFaqSceneEnterArgs) => {
  const { ctx } = args;

  const text = generateText();
  const inline_keyboard = generateFaqSceneInlineKeyboard();

  await ctx.replyWithHTML(text, { reply_markup: { inline_keyboard } });
};
