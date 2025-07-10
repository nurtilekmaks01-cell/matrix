import { Replenish } from 'src/modules/replenish/entities/replenish.entity';
import { ERequest } from 'src/shared/types/request';
import { User } from 'src/modules/user/entities/user.entity';
import { REPLENISH_REQUEST_STATUS_TEXT } from '../../../actions/status.action';

interface IInitialTextArgs {
  replenish: Replenish;
}
export const initialReplenishGroupText = (args: IInitialTextArgs) => {
  const { replenish } = args;

  const text = `
🆔ID 1XBET: <code>${replenish.bet_id}</code>

💵Сумма: ${replenish.price}

ФИО: ${replenish.name}

Telegram: @${replenish?.user?.username}
`;

  return text;
};

export function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) {
    return `${remainingSeconds}s`;
  } else {
    return `${minutes}min ${remainingSeconds}s`;
  }
}

interface IEditTextArgs {
  replenish: Replenish;
  status: ERequest;
  admin: User;
  timeAgo: string;
}
export const editReplenishGroupText = (args: IEditTextArgs) => {
  const { replenish, status, admin, timeAgo } = args;

  const text = `
${timeAgo}
@${admin.username}

${initialReplenishGroupText({ replenish })}

${REPLENISH_REQUEST_STATUS_TEXT[status]}
`;

  return text;
};
