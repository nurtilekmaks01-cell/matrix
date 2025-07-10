import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import {
  REPLENISH_REQUEST_STATUS_CALLBACK,
  REPLENISH_REQUEST_STATUS_CALLBACK_CONFIRM,
  REPLENISH_REQUEST_STATUS_TEXT,
} from '../../../actions/status.action';
import { ERequest } from 'src/shared/types/request';

export const createReplenishInlineKeyboard = () => {
  const inlineKeyboard: InlineKeyboardButton[][] = [];

  inlineKeyboard.push([
    {
      text: REPLENISH_REQUEST_STATUS_TEXT[ERequest.API],
      callback_data: REPLENISH_REQUEST_STATUS_CALLBACK[ERequest.API],
    },
    {
      text: REPLENISH_REQUEST_STATUS_TEXT[ERequest.APPROVED],
      callback_data: REPLENISH_REQUEST_STATUS_CALLBACK[ERequest.APPROVED],
    },
  ]);

  inlineKeyboard.push([
    {
      text: REPLENISH_REQUEST_STATUS_TEXT[ERequest.CANCELED],
      callback_data: REPLENISH_REQUEST_STATUS_CALLBACK[ERequest.CANCELED],
    },
    {
      text: REPLENISH_REQUEST_STATUS_TEXT[ERequest.BANED],
      callback_data: REPLENISH_REQUEST_STATUS_CALLBACK[ERequest.BANED],
    },
  ]);

  return inlineKeyboard;
};

const API_INLINE_KEYBOARD: InlineKeyboardButton[][] = [
  [
    {
      text: REPLENISH_REQUEST_STATUS_TEXT[ERequest.API],
      callback_data: REPLENISH_REQUEST_STATUS_CALLBACK_CONFIRM[ERequest.API],
    },
  ],
  [
    {
      text: REPLENISH_REQUEST_STATUS_TEXT[ERequest.BACK],
      callback_data: REPLENISH_REQUEST_STATUS_CALLBACK[ERequest.BACK],
    },
  ],
];

const APROVED_INLINE_KEYBOARD: InlineKeyboardButton[][] = [
  [
    {
      text: REPLENISH_REQUEST_STATUS_TEXT[ERequest.APPROVED],
      callback_data:
        REPLENISH_REQUEST_STATUS_CALLBACK_CONFIRM[ERequest.APPROVED],
    },
  ],
  [
    {
      text: REPLENISH_REQUEST_STATUS_TEXT[ERequest.BACK],
      callback_data: REPLENISH_REQUEST_STATUS_CALLBACK[ERequest.BACK],
    },
  ],
];

const BANED_INLINE_KEYBOARD: InlineKeyboardButton[][] = [
  [
    {
      text: REPLENISH_REQUEST_STATUS_TEXT[ERequest.BANED],
      callback_data: REPLENISH_REQUEST_STATUS_CALLBACK_CONFIRM[ERequest.BANED],
    },
  ],
  [
    {
      text: REPLENISH_REQUEST_STATUS_TEXT[ERequest.BACK],
      callback_data: REPLENISH_REQUEST_STATUS_CALLBACK[ERequest.BACK],
    },
  ],
];

const CANCELED_INLINE_KEYBOARD: InlineKeyboardButton[][] = [
  [
    {
      text: REPLENISH_REQUEST_STATUS_TEXT[ERequest.CANCELED],
      callback_data:
        REPLENISH_REQUEST_STATUS_CALLBACK_CONFIRM[ERequest.CANCELED],
    },
  ],
  [
    {
      text: REPLENISH_REQUEST_STATUS_TEXT[ERequest.BACK],
      callback_data: REPLENISH_REQUEST_STATUS_CALLBACK[ERequest.BACK],
    },
  ],
];

const PENDING_INLINE_KEYBOARD: InlineKeyboardButton[][] = [
  [
    {
      text: REPLENISH_REQUEST_STATUS_TEXT[ERequest.PENDING],
      callback_data:
        REPLENISH_REQUEST_STATUS_CALLBACK_CONFIRM[ERequest.PENDING],
    },
  ],
  [
    {
      text: REPLENISH_REQUEST_STATUS_TEXT[ERequest.BACK],
      callback_data: REPLENISH_REQUEST_STATUS_CALLBACK[ERequest.BACK],
    },
  ],
];

export const REPLENISH_INLINE_KEYBOARDS = {
  [REPLENISH_REQUEST_STATUS_CALLBACK[ERequest.API]]: API_INLINE_KEYBOARD,
  [REPLENISH_REQUEST_STATUS_CALLBACK[ERequest.APPROVED]]:
    APROVED_INLINE_KEYBOARD,
  [REPLENISH_REQUEST_STATUS_CALLBACK[ERequest.BANED]]: BANED_INLINE_KEYBOARD,
  [REPLENISH_REQUEST_STATUS_CALLBACK[ERequest.CANCELED]]:
    CANCELED_INLINE_KEYBOARD,
  [REPLENISH_REQUEST_STATUS_CALLBACK[ERequest.PENDING]]:
    PENDING_INLINE_KEYBOARD,
  [REPLENISH_REQUEST_STATUS_CALLBACK[ERequest.BACK]]:
    createReplenishInlineKeyboard(),
};
