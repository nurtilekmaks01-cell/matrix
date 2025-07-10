import { Replenish } from 'src/modules/replenish/entities/replenish.entity';
import { REPLENISH_REQUEST_STATUS_TEXT } from 'src/modules/telegram/scenes/replenish/actions/status.action';
import { Withdraw } from 'src/modules/withdraw/entities/withdraw.entity';
import { ERequest } from 'src/shared/types/request';

interface IMessageArgs {
  withdraw: Withdraw;
}
export const generateWithdrawConfirmApiText = (args: IMessageArgs) => {
  const { withdraw } = args;

  const text = `
${REPLENISH_REQUEST_STATUS_TEXT[ERequest.API]}
🆔ID 1XBET: ${withdraw.bet_id}
status: ${withdraw.status}
`;

  return text;
};

export const generateWithdrawConfirmAprovedText = (args: IMessageArgs) => {
  const { withdraw } = args;

  const text = `
${REPLENISH_REQUEST_STATUS_TEXT[ERequest.APPROVED]}
🆔ID 1XBET: ${withdraw.bet_id}
status: ${withdraw.status}
`;

  return text;
};

export const generateWithdrawConfirmBanedText = (args: IMessageArgs) => {
  const { withdraw } = args;

  const text = `
${REPLENISH_REQUEST_STATUS_TEXT[ERequest.BANED]}
🆔ID 1XBET: ${withdraw.bet_id}
status: ${withdraw.status}
`;

  return text;
};

export const generateWithdrawConfirmCanceledText = (args: IMessageArgs) => {
  const { withdraw } = args;

  const text = `
${REPLENISH_REQUEST_STATUS_TEXT[ERequest.CANCELED]}
🆔ID 1XBET: ${withdraw.bet_id}
status: ${withdraw.status}
`;

  return text;
};
