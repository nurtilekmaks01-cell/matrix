import { EBANK_TEXT, EBanks } from 'src/modules/bank/shared/types';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { SceneContext } from 'telegraf/typings/scenes';
import { clearWithdrawSession, IWithdrawSession } from '../session';
import { TELEGRAM_ACTION_KEYBOARDS } from 'src/modules/telegram/actions/keyboard';

export const generateQrcodeText = () => {
  const text = `
📲 Отправьте QR-код

Пожалуйста, пришлите фото или сканированный QR-код для подтверждения
`;
  return text;
};

interface ISceneEnterArgs {
  ctx: SceneContext;
}
export const withdrawSceneEnter = async (args: ISceneEnterArgs) => {
  const { ctx } = args;
  const session = ctx.session as IWithdrawSession;

  session.is_qrcode = true;
  const qrcodeText = generateQrcodeText();
  await ctx.replyWithHTML(qrcodeText, {
    reply_markup: {
      keyboard: [[{ text: TELEGRAM_ACTION_KEYBOARDS.CANCELED }]],
      resize_keyboard: true,
    },
  });
  clearWithdrawSession(session);
};
