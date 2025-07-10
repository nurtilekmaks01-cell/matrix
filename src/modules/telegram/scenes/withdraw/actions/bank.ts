import { SceneContext } from 'telegraf/typings/scenes';
import { IWithdrawSession } from '../session';
import { EBanks } from 'src/modules/bank/shared/types';
import { KeyupService } from 'src/helpers/keyup/keyup.service';
import { KeyboardButton } from 'telegraf/typings/core/types/typegram';
import { EKeyupTypeAction } from 'src/helpers/keyup/shared/type';
import { TELEGRAM_ACTION_KEYBOARDS } from 'src/modules/telegram/actions/keyboard';

export const generatePhoneNumberText = () => {
  const text = `
📱 Введите номер телефона (Кыргызстан)

Пожалуйста, укажите номер в формате:
+996 XXX XXX XXX 
или 
0XXX XXX XXX

Пример: +996 555 123 456 или 0555 123 456
`;
  return text;
};

const generateQrcodeText = () => {
  const text = `
📲 Отправьте QR-код

Пожалуйста, пришлите фото или сканированный QR-код для подтверждения
`;
  return text;
};

interface IKeyupCreateArgs {
  keyupService: KeyupService;
  telegram_id: string;
}
const createKeyboard = async (args: IKeyupCreateArgs) => {
  const { keyupService, telegram_id } = args;

  const keyboard: KeyboardButton[][] = [];

  const list = await keyupService.findAllWithOptions({
    where: { user: { telegram_id }, type: EKeyupTypeAction.PHONE_NUMBER },
    take: 2,
    order: {
      createAt: 'DESC',
    },
  });

  for (const element of list) {
    keyboard.push([{ text: element.value }]);
  }

  keyboard.push([{ text: TELEGRAM_ACTION_KEYBOARDS.CANCELED }]);

  return keyboard;
};

interface IBankActionArgs {
  ctx: SceneContext;
  keyupService: KeyupService;
}
export const withdrawBankAction = async (args: IBankActionArgs) => {
  const { ctx, keyupService } = args;
  const session = ctx.session as IWithdrawSession;
  const from = ctx.from;

  const telegram_id: string = String(from?.id);

  const callbackQuery = ctx.callbackQuery;
  if (!callbackQuery) return;
  if (!('data' in callbackQuery)) return;

  const callback_data = callbackQuery.data as EBanks;

  session.bank = callback_data;

  if (callback_data === EBanks.QRCODE) {
    session.is_qrcode = true;
    const qrcodeText = generateQrcodeText();
    await ctx.replyWithHTML(qrcodeText, {
      reply_markup: {
        keyboard: [[{ text: TELEGRAM_ACTION_KEYBOARDS.CANCELED }]],
        resize_keyboard: true,
      },
    });

    return;
  }

  const text = generatePhoneNumberText();
  const keyboard = await createKeyboard({ keyupService, telegram_id });
  await ctx.replyWithHTML(text, {
    reply_markup: { keyboard, resize_keyboard: true },
  });
};
