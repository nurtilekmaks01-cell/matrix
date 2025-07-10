import { SceneContext } from 'telegraf/typings/scenes';
import { ETelegramAdminActions } from '../start/helpers/actions';

interface ITelegramAdminActions {
  ctx: SceneContext;
}
export const adminTelegramActions = async (args: ITelegramAdminActions) => {
  const { ctx } = args;

  const callbackQuery = ctx.callbackQuery;

  if (!callbackQuery) return;
  if (!('data' in callbackQuery)) return;
  const callback_data = callbackQuery.data as ETelegramAdminActions;

  await ctx.scene.enter(callback_data);
};
