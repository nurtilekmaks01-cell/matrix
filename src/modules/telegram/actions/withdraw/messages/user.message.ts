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
📋 <b>Заявка на вывод:</b>
🆔 ID 1xBet: <b>${withdraw.bet_id}</b>
⏱️ Статус: <b>На обработке</b>
`;

  return text;
};

export const generateWithdrawConfirmAprovedText = (args: IMessageArgs) => {
  const { withdraw } = args;

  const text = `
${REPLENISH_REQUEST_STATUS_TEXT[ERequest.APPROVED]}
🎉 <b>Вывод одобрен!</b>
🆔 ID 1xBet: <b>${withdraw.bet_id}</b>
✅ Статус: <b>Выполнено</b>
`;

  return text;
};

export const generateWithdrawConfirmBanedText = (args: IMessageArgs) => {
  const { withdraw } = args;

  const text = `
${REPLENISH_REQUEST_STATUS_TEXT[ERequest.BANED]}
🚫 <b>Вывод отклонен</b>
🆔 ID 1xBet: <b>${withdraw.bet_id}</b>
❌ Статус: <b>Заблокировано</b>
`;

  return text;
};

export const generateWithdrawConfirmCanceledText = (args: IMessageArgs) => {
  const { withdraw } = args;

  const text = `
${REPLENISH_REQUEST_STATUS_TEXT[ERequest.CANCELED]}
↩️ <b>Вывод отменен</b>
🆔 ID 1xBet: <b>${withdraw.bet_id}</b>
⏹️ Статус: <b>Отменено</b>
`;

  return text;
};
