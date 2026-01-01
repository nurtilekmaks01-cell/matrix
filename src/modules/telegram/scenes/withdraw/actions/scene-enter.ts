import { EBANK_TEXT, EBanks } from 'src/modules/bank/shared/types';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { SceneContext } from 'telegraf/typings/scenes';
import { clearWithdrawSession, IWithdrawSession } from '../session';
import { TELEGRAM_ACTION_KEYBOARDS } from 'src/modules/telegram/actions/keyboard';
import { BOOKMAKER_TEXT, EBookmakers } from 'src/shared/types/telegram';

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

  if (!session.is_main) {
    const qrcodeText = generateQrcodeText();
    await ctx.replyWithHTML(qrcodeText, {
      reply_markup: {
        keyboard: [[{ text: TELEGRAM_ACTION_KEYBOARDS.CANCELED }]],
        resize_keyboard: true,
      },
    });
  } else {
    const inline_keyboard: InlineKeyboardButton[][] = [
      [
        {
          text: BOOKMAKER_TEXT[EBookmakers.XBET],
          callback_data: EBookmakers.XBET,
        },
        {
          text: BOOKMAKER_TEXT[EBookmakers.MELBET],
          callback_data: EBookmakers.MELBET,
        },
      ],
    ];

    const message = await ctx.replyWithHTML(`📝 <b>Выбор операции</b>`, {
      reply_markup: { inline_keyboard },
    });

    session.bookmaker_message_id = message.message_id;
  }

  clearWithdrawSession(session);
};
