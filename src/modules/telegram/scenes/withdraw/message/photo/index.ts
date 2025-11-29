import {
  KeyboardButton,
  PhotoSize,
} from 'telegraf/typings/core/types/typegram';
import { SceneContext } from 'telegraf/typings/scenes';
import { IWithdrawSession } from '../../session';
import { leaveScene } from '../../..';
import { generatePhoneNumberText } from '../../actions/bank';
import { generateQrcodeText } from '../../actions/scene-enter';
import { TELEGRAM_ACTION_KEYBOARDS } from 'src/modules/telegram/actions/keyboard';

const generateNotAcceptPhotoText = () => {
  const text = `
not accept photo
  `;
  return text;
};

const generateText = () => {
  const text = generatePhoneNumberText();

  return text;
};

const generateKeyboard = () => {
  const keyboard: KeyboardButton[][] = [];

  return keyboard;
};

interface IWithdrawQrcodeArgs {
  ctx: SceneContext;
  photo: PhotoSize[];
}
export const withdrawQrcode = async (args: IWithdrawQrcodeArgs) => {
  const { ctx, photo } = args;
  const session = ctx.session as IWithdrawSession;

  if (session.qrcode_file_id) {
    const text = generateNotAcceptPhotoText();
    await ctx.replyWithHTML(text);
    return;
  }

  const text = generateText();
  const keyboard = generateKeyboard();

  await ctx.replyWithHTML(text, {
    reply_markup: { keyboard, resize_keyboard: true },
  });

  const photo_id = photo?.[0].file_id;

  session.qrcode_file_id = photo_id;
};

interface IQrcodeArgs {
  ctx: SceneContext;
  session: IWithdrawSession;
}
export const withdrawMessageQrcodeEnter = async (args: IQrcodeArgs) => {
  const { ctx, session } = args;

  session.is_qrcode = true;
  const qrcodeText = generateQrcodeText();
  await ctx.replyWithHTML(qrcodeText, {
    reply_markup: {
      keyboard: [[{ text: TELEGRAM_ACTION_KEYBOARDS.CANCELED }]],
      resize_keyboard: true,
    },
  });
};
