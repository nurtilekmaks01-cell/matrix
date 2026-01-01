import { ITelegramDefaultSession } from 'src/shared/types/session';
import { EBookmakers } from 'src/shared/types/telegram';
import { SceneContext } from 'telegraf/typings/scenes';
import { KeyupService } from 'src/helpers/keyup/keyup.service';
import { IWithdrawSession } from '../session';
import { generateQrcodeText } from './scene-enter';
import { TELEGRAM_ACTION_KEYBOARDS } from 'src/modules/telegram/actions/keyboard';

interface IWithdrawAction {
  ctx: SceneContext;
}
export const withdrawBookmakerAction = async (args: IWithdrawAction) => {
  const { ctx } = args;

  const callbackQuery = ctx.callbackQuery;

  const from = ctx.from;
  if (!from) return;

  const telegram_id = String(from.id);

  const session = ctx.session as IWithdrawSession;

  if (!callbackQuery) return;
  if (!('data' in callbackQuery)) return;
  const callback_data = callbackQuery.data as EBookmakers;

  session.bet.type = callback_data;

  const qrcodeText = generateQrcodeText();
  await ctx.replyWithHTML(qrcodeText, {
    reply_markup: {
      keyboard: [[{ text: TELEGRAM_ACTION_KEYBOARDS.CANCELED }]],
      resize_keyboard: true,
    },
  });

  if (session.bookmaker_message_id) {
    await ctx.deleteMessage(session.bookmaker_message_id);
  }
};
