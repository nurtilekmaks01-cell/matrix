import { WithdrawService } from 'src/modules/withdraw/withdraw.service';
import { ERequest } from 'src/shared/types/request';
import { CallbackQuery } from 'telegraf/typings/core/types/typegram';
import { SceneContext } from 'telegraf/typings/scenes';
import { withdrawInitialText } from '../../scenes/withdraw/message/secret-code/helpers/group';
import { WITHDRAW_STATUS_INLINE_KEYBOARDS } from '../../scenes/withdraw/message/secret-code/helpers/inline-keyboard';

interface IWithdrawActionArgs {
  ctx: SceneContext;
  withdrawService: WithdrawService;
}
export const withdrawRequestAction = async (args: IWithdrawActionArgs) => {
  const { ctx, withdrawService } = args;

  const callback = ctx.callbackQuery as CallbackQuery;
  const message = callback?.message;

  if (!('data' in callback)) return;

  if (!message) return;

  const callback_data = callback.data as ERequest;
  const message_id = String(message.message_id);

  const withdraw = await withdrawService.findOneWithOptions({
    where: { message_id },
    relations: ['user', 'admin'],
  });

  if (!withdraw) return;

  const initialText = withdrawInitialText({ withdraw });

  const inline_keyboard = WITHDRAW_STATUS_INLINE_KEYBOARDS[callback_data];

  await ctx.editMessageText(initialText, {
    parse_mode: 'HTML',
    reply_markup: { inline_keyboard },
  });
};
