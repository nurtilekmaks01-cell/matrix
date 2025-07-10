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
🆔ID 1XBET: ${replenish.bet_id}
💵Сумма: ${replenish.price}
`;

  return text;
};

export const generateReplenishConfirmApprovedText = (args: IMessageArgs) => {
  const { replenish } = args;

  const text = `
${REPLENISH_REQUEST_STATUS_TEXT[ERequest.APPROVED]}
🆔ID 1XBET: ${replenish.bet_id}
💵Сумма: ${replenish.price}
`;

  return text;
};

export const generateReplenishConfirmBanedText = (args: IMessageArgs) => {
  const { replenish } = args;

  const text = `
${REPLENISH_REQUEST_STATUS_TEXT[ERequest.BANED]}
🆔ID 1XBET: ${replenish.bet_id}
💵Сумма: ${replenish.price}
`;

  return text;
};

export const generateReplenishConfirmCanceledText = (args: IMessageArgs) => {
  const { replenish } = args;

  const text = `
${REPLENISH_REQUEST_STATUS_TEXT[ERequest.CANCELED]}
🆔ID 1XBET: ${replenish.bet_id}
💵Сумма: ${replenish.price}
`;

  return text;
};
