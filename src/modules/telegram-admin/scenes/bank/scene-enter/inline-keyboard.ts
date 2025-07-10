import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { EBankSceneActions } from '../types';

export const generateBankSceneInlineKeyboard = () => {
  const inline_keyboard: InlineKeyboardButton[][] = [];

  inline_keyboard.push([
    {
      text: EBankSceneActions.ADD_BANK,
      callback_data: EBankSceneActions.ADD_BANK,
    },
  ]);
  inline_keyboard.push([
    {
      text: EBankSceneActions.EDIT_BANK,
      callback_data: EBankSceneActions.EDIT_BANK,
    },
  ]);

  return inline_keyboard;
};
