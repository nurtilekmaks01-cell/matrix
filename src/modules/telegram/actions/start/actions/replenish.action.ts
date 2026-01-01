import { TelegramScenes } from 'src/modules/telegram/scenes';
import { SceneContext } from 'telegraf/typings/scenes';
import { START_ACTIONS_SCENES } from '../constants/action.constant';
import { ITelegramDefaultSession } from 'src/shared/types/session';

interface IReplenishActionArgs {
  ctx: SceneContext;
}
export const replenishAction = async (args: IReplenishActionArgs) => {
  const { ctx } = args;

  const session = ctx.session as ITelegramDefaultSession;

  if (session.bet.choose_action_message_id) {
    await ctx.deleteMessage(session.bet.choose_action_message_id);
  }

  const callbackQuery = ctx.callbackQuery;

  if (!callbackQuery) return;
  if (!('data' in callbackQuery)) return;
  const callback_data = callbackQuery.data;

  const scene = START_ACTIONS_SCENES[callback_data];

  await ctx.scene.enter(scene);
};
