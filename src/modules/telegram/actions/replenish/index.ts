import { ReplenishService } from 'src/modules/replenish/replenish.service';
import { ERequest } from 'src/shared/types/request';
import { CallbackQuery } from 'telegraf/typings/core/types/typegram';
import { SceneContext } from 'telegraf/typings/scenes';
import { initialReplenishGroupText } from '../../scenes/replenish/message/photo/constants/group.constant';
import { REPLENISH_INLINE_KEYBOARDS } from '../../scenes/replenish/message/photo/helpers/inline-keyboard.helper';

interface IReplenishRequestArgs {
  ctx: SceneContext;
  replenishService: ReplenishService;
}
export const replenishRequestAction = async (args: IReplenishRequestArgs) => {
  const { ctx, replenishService } = args;

  const callback = ctx.callbackQuery as CallbackQuery;
  const message = callback?.message;

  if (!('data' in callback)) return;

  if (!message) return;

  const callback_data = callback.data as ERequest;
  const message_id = String(message.message_id);

  const replenish = await replenishService.findOneWithOptions({
    where: {
      message_id,
    },
    relations: ['user'],
  });

  if (!replenish) return;

  const initialText = initialReplenishGroupText({ replenish });

  const inline_keyboard = REPLENISH_INLINE_KEYBOARDS[callback_data];

  await ctx.editMessageCaption(initialText, {
    reply_markup: { inline_keyboard: inline_keyboard },
  });
};
