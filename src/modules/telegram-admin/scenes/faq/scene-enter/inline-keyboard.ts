import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { EFaqSceneActions } from '../types';

export const generateFaqSceneInlineKeyboard = () => {
  const inline_keyboard: InlineKeyboardButton[][] = [];

  inline_keyboard.push([
    {
      text: EFaqSceneActions.ADD_FAQ,
      callback_data: EFaqSceneActions.ADD_FAQ,
    },
  ]);

  inline_keyboard.push([
    {
      text: EFaqSceneActions.EDIT_FAQ,
      callback_data: EFaqSceneActions.EDIT_FAQ,
    },
  ]);

  return inline_keyboard;
};
