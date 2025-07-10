import { ReplenishService } from 'src/modules/replenish/replenish.service';
import { ERequest } from 'src/shared/types/request';
import { CallbackQuery } from 'telegraf/typings/core/types/typegram';
import { SceneContext } from 'telegraf/typings/scenes';
import {
  generateReplenishConfirmApiText,
  generateReplenishConfirmApprovedText,
  generateReplenishConfirmBanedText,
  generateReplenishConfirmCanceledText,
} from './messages/user.message';
import {
  REPLENISH_REQUEST_STATUS,
  REPLENISH_REQUEST_STATUS_CALLBACK_CONFIRM,
} from '../../scenes/replenish/actions/status.action';
import {
  editReplenishGroupText,
  formatDuration,
} from '../../scenes/replenish/message/photo/constants/group.constant';
import { UserService } from 'src/modules/user/user.service';
import { formatDistance, formatDistanceToNow, subDays } from 'date-fns';
import { ru } from 'date-fns/locale';

interface IReplenishRequestArgs {
  ctx: SceneContext;
  replenishService: ReplenishService;
  userService: UserService;
}
export const confirmReplenishRequestAction = async (
  args: IReplenishRequestArgs,
) => {
  const { ctx, replenishService, userService } = args;

  const callback = ctx.callbackQuery as CallbackQuery;
  const message = callback?.message;
  const from = ctx.from;

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

  const REPLENISH_USER_REPLY_MESSAGES = {
    [REPLENISH_REQUEST_STATUS_CALLBACK_CONFIRM[ERequest.API]]:
      generateReplenishConfirmApiText({ replenish }),
    [REPLENISH_REQUEST_STATUS_CALLBACK_CONFIRM[ERequest.APPROVED]]:
      generateReplenishConfirmApprovedText({ replenish }),
    [REPLENISH_REQUEST_STATUS_CALLBACK_CONFIRM[ERequest.BANED]]:
      generateReplenishConfirmBanedText({ replenish }),
    [REPLENISH_REQUEST_STATUS_CALLBACK_CONFIRM[ERequest.CANCELED]]:
      generateReplenishConfirmCanceledText({ replenish }),
  };

  const status = REPLENISH_REQUEST_STATUS[callback_data];

  await replenishService.update(replenish.id, { status });

  const userMessage = REPLENISH_USER_REPLY_MESSAGES[callback_data];

  await ctx.telegram.sendMessage(replenish.user.telegram_id, userMessage, {});

  const user = await userService.findOneWithOptions({
    where: { telegram_id: String(from?.id) },
  });

  if (!user) {
    return;
  }

  const startDate = new Date(replenish.createAt).getTime();
  const endDate = new Date(replenish.updateAt).getTime();

  const diffInMs = endDate - startDate;

  // Convert the difference to seconds
  const diffInSeconds = Math.floor(diffInMs / 1000);

  const timeAgo = formatDuration(diffInSeconds);

  const editText = editReplenishGroupText({
    admin: user,
    replenish,
    status,
    timeAgo,
  });

  await ctx.editMessageCaption(editText, {
    // reply_markup: { inline_keyboard: [] },
  });

  if (status === ERequest.BANED) {
    await userService.updateBaned({
      status: true,
      telegram_id: replenish.user.telegram_id,
    });
  }
};
