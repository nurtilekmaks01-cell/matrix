import { WithdrawService } from 'src/modules/withdraw/withdraw.service';
import { IWithdrawSession } from '../../../session';
import { SceneContext } from 'telegraf/typings/scenes';
import { CreateWithdrawDto } from 'src/modules/withdraw/dto/create-withdraw.dto';
import { EBanks } from 'src/modules/bank/shared/types';
import { Withdraw } from 'src/modules/withdraw/entities/withdraw.entity';
import { TelegramConfig } from 'src/helpers/config/services/telegram.config';
import { WITHDRAW_INLINE_KEYBOARDS } from './inline-keyboard';
import { User } from 'src/modules/user/entities/user.entity';
import { ERequest } from 'src/shared/types/request';
import { REPLENISH_REQUEST_STATUS_TEXT } from 'src/modules/telegram/scenes/replenish/actions/status.action';

interface ICreateArgs {
  withdrawService: WithdrawService;
  session: IWithdrawSession;
  text: string;
  message_id: string;
  telegram_id: string;
}
const createWithdraw = async (args: ICreateArgs) => {
  const { session, withdrawService, text, message_id, telegram_id } = args;

  const createWithdrawDto: CreateWithdrawDto = {
    bank: session.bank as EBanks,
    bet_id: session.bet_id as string,
    name: session.name as string,
    phone_number: session.phone_number as string,
    secret_code: text,
    message_id,
    telegram_id,
  };

  const withdraw = await withdrawService.create(createWithdrawDto);

  return withdraw;
};

interface WithdrawInitialArgs {
  withdraw: Withdraw;
}
export const withdrawInitialText = (args: WithdrawInitialArgs) => {
  const { withdraw } = args;
  const text = `
ФИО: ${withdraw.name}
🆔: <code>${withdraw.bet_id}</code>
🏦:${withdraw.bank}
📳: <code>${withdraw.phone_number}</code>
code: <code>${withdraw.secret_code}</code>
@${withdraw.user.username}
`;

  return text;
};

interface IEditWithdrawArgs {
  withdraw: Withdraw;
  admin: User;
  status: ERequest;
  timeAgo: string;
}
export const editWithdrawInitialText = (args: IEditWithdrawArgs) => {
  const { withdraw, admin, status, timeAgo } = args;

  const text = `
@${admin.username}
${timeAgo}

${withdrawInitialText({ withdraw })}

${REPLENISH_REQUEST_STATUS_TEXT[status]}
`;

  return text;
};

interface IWithdrawArgs {
  ctx: SceneContext;
  session: IWithdrawSession;
  text: string;
  withdrawService: WithdrawService;
  telegramConfig: TelegramConfig;
  message_id: string;
}
export const sendWithdrawGroup = async (args: IWithdrawArgs) => {
  const { ctx, telegramConfig, withdrawService } = args;

  const from = ctx.from;
  const telegram_id = String(from?.id);

  const withdraw = await createWithdraw({ ...args, telegram_id });

  if (!withdraw) return;

  const withdrawText = withdrawInitialText({ withdraw });

  const message = await ctx.telegram.sendMessage(
    telegramConfig.withdraw_chat_id,
    withdrawText,
    {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: WITHDRAW_INLINE_KEYBOARDS,
      },
    },
  );

  const message_id = String(message.message_id);
  await withdrawService.update(withdraw.id, { message_id });
};
