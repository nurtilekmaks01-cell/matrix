import { SceneContext } from 'telegraf/typings/scenes';
import { EFaqSceneActions } from '../types';

interface IFaqActionArgs {
  ctx: SceneContext;
}
export const faqAction = async (args: IFaqActionArgs) => {
  const { ctx } = args;

  const callbackQuery = ctx.callbackQuery;

  if (!callbackQuery) return;
  if (!('data' in callbackQuery)) return;
  const callback_data = callbackQuery.data as EFaqSceneActions;

  const scene = EFaqSceneActions[callback_data];

  await ctx.scene.enter(scene);
};
