import { ERequest } from 'src/shared/types/request';

export const REPLENISH_REQUEST_STATUS_TEXT: Record<ERequest, string> = {
  [ERequest.APPROVED]: '✅ Одобрено',
  [ERequest.BANED]: '🚫 Заблокировано',
  [ERequest.CANCELED]: '❌ Отменено',
  [ERequest.PENDING]: '⏳ Ожидает обработки',
  [ERequest.API]: '🌐 Обработать API',
  [ERequest.BACK]: '⬅️ Назад',
};

export const REPLENISH_REQUEST_STATUS_CALLBACK: Record<ERequest, string> = {
  [ERequest.APPROVED]: `REPLENISH_${ERequest.APPROVED}`,
  [ERequest.BANED]: `REPLENISH_${ERequest.BANED}`,
  [ERequest.CANCELED]: `REPLENISH_${ERequest.CANCELED}`,
  [ERequest.PENDING]: `REPLENISH_${ERequest.PENDING}`,
  [ERequest.API]: `REPLENISH_${ERequest.API}`,
  [ERequest.BACK]: `REPLENISH_${ERequest.BACK}`,
};

export const REPLENISH_REQUEST_STATUS_CALLBACK_CONFIRM: Record<
  ERequest,
  string
> = {
  [ERequest.APPROVED]: `CONFIRM_REPLENISH_${ERequest.APPROVED}`,
  [ERequest.BANED]: `CONFIRM_REPLENISH_${ERequest.BANED}`,
  [ERequest.CANCELED]: `CONFIRM_REPLENISH_${ERequest.CANCELED}`,
  [ERequest.PENDING]: `CONFIRM_REPLENISH_${ERequest.PENDING}`,
  [ERequest.API]: `CONFIRM_REPLENISH_${ERequest.API}`,
  [ERequest.BACK]: `CONFIRM_REPLENISH_${ERequest.BACK}`,
};

export const REPLENISH_REQUEST_STATUS = {
  [REPLENISH_REQUEST_STATUS_CALLBACK_CONFIRM[ERequest.API]]: ERequest.API,
  [REPLENISH_REQUEST_STATUS_CALLBACK_CONFIRM[ERequest.APPROVED]]:
    ERequest.APPROVED,
  [REPLENISH_REQUEST_STATUS_CALLBACK_CONFIRM[ERequest.BACK]]: ERequest.BACK,
  [REPLENISH_REQUEST_STATUS_CALLBACK_CONFIRM[ERequest.BANED]]: ERequest.BANED,
  [REPLENISH_REQUEST_STATUS_CALLBACK_CONFIRM[ERequest.CANCELED]]:
    ERequest.CANCELED,
  [REPLENISH_REQUEST_STATUS_CALLBACK_CONFIRM[ERequest.PENDING]]:
    ERequest.PENDING,
};

export const REPLENISH_OTHER_ACTIONS = {
  BACK: `REPLENISH_BACK`,
};
