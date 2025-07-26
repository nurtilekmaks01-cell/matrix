import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { ETelegramAdminNewsActions } from '../../actions';
import { TELEGRAM_ACTION_KEYBOARDS } from 'src/modules/telegram/actions/keyboard';

export const generateNewsInlineKeyboard = () => {
  const inline_keyboard: InlineKeyboardButton[][] = [];

  inline_keyboard.push([
    {
      text: ETelegramAdminNewsActions.SEND,
      callback_data: ETelegramAdminNewsActions.SEND,
    },
  ]);

  inline_keyboard.push([
    {
      text: TELEGRAM_ACTION_KEYBOARDS.CANCELED,
      callback_data: TELEGRAM_ACTION_KEYBOARDS.CANCELED,
    },
  ]);

  return inline_keyboard;
};
