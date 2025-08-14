import { UserService } from 'src/modules/user/user.service';
import { WithdrawService } from 'src/modules/withdraw/withdraw.service';
import { ERequest } from 'src/shared/types/request';
import { CallbackQuery } from 'telegraf/typings/core/types/typegram';
import { SceneContext } from 'telegraf/typings/scenes';
import { editWithdrawInitialText } from '../../scenes/withdraw/message/secret-code/helpers/group';
import { formatDuration } from '../../scenes/replenish/message/photo/constants/group.constant';
import {
  generateWithdrawConfirmApiText,
  generateWithdrawConfirmAprovedText,
  generateWithdrawConfirmBanedText,
  generateWithdrawConfirmCanceledText,
} from './messages/user.message';
import {
  WITHDRAW_REQUEST_STATUS,
  WITHDRAW_REQUEST_STATUS_CALLBACK_CONFIRM,
} from '../../scenes/withdraw/actions/status.action';
import { REPLENISH_REQUEST_STATUS } from '../../scenes/replenish/actions/status.action';

interface IConfirmRequest {
  ctx: SceneContext;
  userService: UserService;
  withdrawService: WithdrawService;
}
export const confirmWithdrawRequestAction = async (args: IConfirmRequest) => {
  const { ctx, userService, withdrawService } = args;

  const callback = ctx.callbackQuery as CallbackQuery;
  const message = callback?.message;
  const from = ctx.from;
  const telegram_id = String(from?.id);

  const user = await userService.findOneWithOptions({ where: { telegram_id } });
  if (!user) return;

  if (!('data' in callback)) return;

  if (!message) return;

  const callback_data = callback.data as ERequest;
  const message_id = String(message.message_id);

  const withdraw = await withdrawService.findOneWithOptions({
    where: { message_id },
    relations: ['user'],
  });

  if (!withdraw) return;

  const WITHDRAW_USER_REPLY_MESSAGES = {
    [WITHDRAW_REQUEST_STATUS_CALLBACK_CONFIRM[ERequest.API]]:
      generateWithdrawConfirmApiText({ withdraw }),
    [WITHDRAW_REQUEST_STATUS_CALLBACK_CONFIRM[ERequest.APPROVED]]:
      generateWithdrawConfirmAprovedText({ withdraw }),
    [WITHDRAW_REQUEST_STATUS_CALLBACK_CONFIRM[ERequest.BANED]]:
      generateWithdrawConfirmBanedText({ withdraw }),
    [WITHDRAW_REQUEST_STATUS_CALLBACK_CONFIRM[ERequest.CANCELED]]:
      generateWithdrawConfirmCanceledText({ withdraw }),
  };

  const status = WITHDRAW_REQUEST_STATUS[callback_data];

  await withdrawService.update(withdraw.id, { status });

  const userMessage = WITHDRAW_USER_REPLY_MESSAGES[callback_data];

  await ctx.telegram.sendMessage(withdraw.user.telegram_id, userMessage, {});

  const startDate = new Date(withdraw.createAt).getTime();
  const endDate = new Date(withdraw.updateAt).getTime();

  const diffInMs = endDate - startDate;

  // Convert the difference to seconds
  const diffInSeconds = Math.floor(diffInMs / 1000);

  const timeAgo = formatDuration(diffInSeconds);

  const editMessage = editWithdrawInitialText({
    admin: user,
    status,
    timeAgo,
    withdraw,
  });

  await ctx.editMessageText(editMessage, {
    // reply_markup: { inline_keyboard: [] },
    parse_mode: 'HTML',
  });
};
