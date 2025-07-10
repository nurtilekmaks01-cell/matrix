import { SceneContext } from 'telegraf/typings/scenes';

interface IClearInlineKeyboardArgs {
  ctx: SceneContext;
}
export const clearInlineKeyboard = async (args: IClearInlineKeyboardArgs) => {
  const { ctx } = args;

  await ctx.editMessageReplyMarkup({ inline_keyboard: [] });
};
