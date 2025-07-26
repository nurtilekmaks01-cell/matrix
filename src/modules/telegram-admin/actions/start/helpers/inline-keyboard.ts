import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { ETelegramAdminActions } from './actions';

export const adminStartInlineKeyboard = async () => {
  const inline_keyboard: InlineKeyboardButton[][] = [];

  inline_keyboard.push([
    {
      text: ETelegramAdminActions.BANK,
      callback_data: ETelegramAdminActions.BANK,
    },
  ]);
  inline_keyboard.push([
    {
      text: ETelegramAdminActions.FAQ,
      callback_data: ETelegramAdminActions.FAQ,
    },
  ]);
  inline_keyboard.push([
    {
      text: ETelegramAdminActions.NEWS,
      callback_data: ETelegramAdminActions.NEWS,
    },
  ]);

  return inline_keyboard;
};
