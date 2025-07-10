import { SceneContext } from 'telegraf/typings/scenes';
import { EBankSceneActions } from '../types';

interface IBankSceneActionArgs {
  ctx: SceneContext;
}
export const bankSceneAction = async (args: IBankSceneActionArgs) => {
  const { ctx } = args;

  const callbackQuery = ctx.callbackQuery;

  if (!callbackQuery) return;
  if (!('data' in callbackQuery)) return;
  const callback_data = callbackQuery.data as EBankSceneActions;

  await ctx.scene.enter(callback_data);
};
