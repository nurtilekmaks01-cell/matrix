import { SceneContext } from 'telegraf/typings/scenes';
import { IReplenishSession } from '../../../session';
import { initialReplenishGroupText } from '../constants/group.constant';
import { ReplenishService } from 'src/modules/replenish/replenish.service';
import { createReplenish, updateReplenish } from './replenish.helper';
import { createReplenishInlineKeyboard } from './inline-keyboard.helper';

interface IGroupArgs {
  ctx: SceneContext;
  photo_id: string;
  session: IReplenishSession;
  replenishService: ReplenishService;
  message_id: string;
}
export const groupReplenishSend = async (args: IGroupArgs) => {
  const { ctx, photo_id, session, replenishService, message_id } = args;

  const from = ctx.from;

  const replenish = await createReplenish({
    message_id,
    replenishService,
    session,
    telegram_id: String(from?.id),
  });

  const text = initialReplenishGroupText({ replenish });

  const inline_keyboard = createReplenishInlineKeyboard();

  const photo = await ctx.telegram.sendPhoto(
    session.replenish_chat_id,
    photo_id,
    {
      caption: text,
      reply_markup: {
        inline_keyboard,
      },
    },
  );

  await updateReplenish({
    message_id: String(photo.message_id),
    replenish_id: replenish.id,
    replenishService,
  });
};
