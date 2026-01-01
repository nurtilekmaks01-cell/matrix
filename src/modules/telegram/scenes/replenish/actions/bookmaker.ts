import { ITelegramDefaultSession } from 'src/shared/types/session';
import { EBookmakers } from 'src/shared/types/telegram';
import { SceneContext } from 'telegraf/typings/scenes';
import { replenishSceneWithoutBookmaker } from './scene-enter.action';
import { KeyupService } from 'src/helpers/keyup/keyup.service';

interface IReplenishAction {
  ctx: SceneContext;
  keyupService: KeyupService;
}
export const replenishBookmakerAction = async (args: IReplenishAction) => {
  const { ctx, keyupService } = args;

  const callbackQuery = ctx.callbackQuery;

  const from = ctx.from;
  if (!from) return;

  const telegram_id = String(from.id);

  const session = ctx.session as ITelegramDefaultSession;

  if (!callbackQuery) return;
  if (!('data' in callbackQuery)) return;
  const callback_data = callbackQuery.data as EBookmakers;

  session.bet.type = callback_data;

  await replenishSceneWithoutBookmaker({ ctx, keyupService, telegram_id });
};
