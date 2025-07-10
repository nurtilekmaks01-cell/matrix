import { REPLENISH_REQUEST_STATUS_TEXT } from 'src/modules/telegram/scenes/replenish/actions/status.action';
import { ERequest } from 'src/shared/types/request';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import {
  WITHDRAW_REQUEST_STATUS_CALLBACK,
  WITHDRAW_REQUEST_STATUS_CALLBACK_CONFIRM,
} from '../../../actions/status.action';

export const WITHDRAW_INLINE_KEYBOARDS: InlineKeyboardButton[][] = [
  [
    {
      text: REPLENISH_REQUEST_STATUS_TEXT[ERequest.APPROVED],
      callback_data: WITHDRAW_REQUEST_STATUS_CALLBACK[ERequest.APPROVED],
    },
    {
      text: REPLENISH_REQUEST_STATUS_TEXT[ERequest.CANCELED],
      callback_data: WITHDRAW_REQUEST_STATUS_CALLBACK[ERequest.CANCELED],
    },
  ],
];

const API_INLINE_KEYBOARD: InlineKeyboardButton[][] = [
  [
    {
      text: REPLENISH_REQUEST_STATUS_TEXT[ERequest.API],
      callback_data: WITHDRAW_REQUEST_STATUS_CALLBACK_CONFIRM[ERequest.API],
    },
  ],
  [
    {
      text: REPLENISH_REQUEST_STATUS_TEXT[ERequest.BACK],
      callback_data: WITHDRAW_REQUEST_STATUS_CALLBACK[ERequest.BACK],
    },
  ],
];

const APROVED_INLINE_KEYBOARD: InlineKeyboardButton[][] = [
  [
    {
      text: REPLENISH_REQUEST_STATUS_TEXT[ERequest.APPROVED],
      callback_data:
        WITHDRAW_REQUEST_STATUS_CALLBACK_CONFIRM[ERequest.APPROVED],
    },
  ],
  [
    {
      text: REPLENISH_REQUEST_STATUS_TEXT[ERequest.BACK],
      callback_data: WITHDRAW_REQUEST_STATUS_CALLBACK[ERequest.BACK],
    },
  ],
];

const CANCELED_INLINE_KEYBOARD: InlineKeyboardButton[][] = [
  [
    {
      text: REPLENISH_REQUEST_STATUS_TEXT[ERequest.CANCELED],
      callback_data:
        WITHDRAW_REQUEST_STATUS_CALLBACK_CONFIRM[ERequest.CANCELED],
    },
  ],
  [
    {
      text: REPLENISH_REQUEST_STATUS_TEXT[ERequest.BACK],
      callback_data: WITHDRAW_REQUEST_STATUS_CALLBACK[ERequest.BACK],
    },
  ],
];

export const WITHDRAW_STATUS_INLINE_KEYBOARDS = {
  [WITHDRAW_REQUEST_STATUS_CALLBACK[ERequest.API]]: API_INLINE_KEYBOARD,
  [WITHDRAW_REQUEST_STATUS_CALLBACK[ERequest.APPROVED]]:
    APROVED_INLINE_KEYBOARD,
  [WITHDRAW_REQUEST_STATUS_CALLBACK[ERequest.BANED]]: API_INLINE_KEYBOARD,
  [WITHDRAW_REQUEST_STATUS_CALLBACK[ERequest.CANCELED]]:
    CANCELED_INLINE_KEYBOARD,
  [WITHDRAW_REQUEST_STATUS_CALLBACK[ERequest.PENDING]]: API_INLINE_KEYBOARD,
  [WITHDRAW_REQUEST_STATUS_CALLBACK[ERequest.BACK]]: WITHDRAW_INLINE_KEYBOARDS,
};
