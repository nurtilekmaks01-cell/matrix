import { TelegramScenes } from 'src/modules/telegram/scenes';
import { SceneContext } from 'telegraf/typings/scenes';
import { START_ACTIONS_SCENES } from '../constants/action.constant';

interface IReplenishActionArgs {
  ctx: SceneContext;
}
export const replenishAction = async (args: IReplenishActionArgs) => {
  const { ctx } = args;

  const callbackQuery = ctx.callbackQuery;

  if (!callbackQuery) return;
  if (!('data' in callbackQuery)) return;
  const callback_data = callbackQuery.data;

  const scene = START_ACTIONS_SCENES[callback_data];

  await ctx.scene.enter(scene);
};
