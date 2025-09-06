import { Replenish } from 'src/modules/replenish/entities/replenish.entity';
import { REPLENISH_REQUEST_STATUS_TEXT } from 'src/modules/telegram/scenes/replenish/actions/status.action';
import { ERequest } from 'src/shared/types/request';

interface IMessageArgs {
  replenish: Replenish;
}
export const generateReplenishConfirmApiText = (args: IMessageArgs) => {
  const { replenish } = args;

  const text = `
${REPLENISH_REQUEST_STATUS_TEXT[ERequest.API]}
🆔 1xBet ID: <b>${replenish.bet_id}</b>
💸 Сумма: <b>${replenish.price}</b>
🔄 Статус: обработка
`;

  return text;
};

export const generateReplenishConfirmApprovedText = (args: IMessageArgs) => {
  const { replenish } = args;

  const text = `
${REPLENISH_REQUEST_STATUS_TEXT[ERequest.APPROVED]}
🆔 1xBet ID: <b>${replenish.bet_id}</b>
💸 Сумма: <b>${replenish.price}</b>
✅ Статус: выполнено
`;

  return text;
};

export const generateReplenishConfirmBanedText = (args: IMessageArgs) => {
  const { replenish } = args;

  const text = `
${REPLENISH_REQUEST_STATUS_TEXT[ERequest.BANED]}
🆔 1xBet ID: <b>${replenish.bet_id}</b>
💸 Сумма: <b>${replenish.price}</b>
❌ Статус: заблокировано
`;

  return text;
};

export const generateReplenishConfirmCanceledText = (args: IMessageArgs) => {
  const { replenish } = args;

  const text = `
${REPLENISH_REQUEST_STATUS_TEXT[ERequest.CANCELED]}
🆔 1xBet ID: <b>${replenish.bet_id}</b>
💸 Сумма: <b>${replenish.price}</b>
⏹️ Статус: отменено
`;

  return text;
};
