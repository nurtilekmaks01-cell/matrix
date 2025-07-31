import { SceneContext } from 'telegraf/typings/scenes';
import { IWithdrawSession } from '../session';
import { withdrawMessagePhoneNumber } from './phone-number';
import { withdrawMessageBetId } from './bet-id';
import { withdrawMessageSecretCode } from './secret-code';
import { WithdrawService } from 'src/modules/withdraw/withdraw.service';
import { TelegramConfig } from 'src/helpers/config/services/telegram.config';
import { FaqService } from 'src/helpers/faq/faq.service';
import { KeyupService } from 'src/helpers/keyup/keyup.service';
import { withdrawMessageName } from './name';
import { AxiosService } from 'src/helpers/axios/axios.service';

interface IWithdrawMessageArgs {
  ctx: SceneContext;
  text: string;
  withdrawService: WithdrawService;
  telegramConfig: TelegramConfig;
  faqService: FaqService;
  keyupService: KeyupService;
  axiosService: AxiosService;
}
export const withdrawMessage = async (args: IWithdrawMessageArgs) => {
  const { ctx } = args;
  const session = ctx.session as IWithdrawSession;
  const from = ctx.from;

  if (!from) return;

  const telegram_id = String(from.id);

  if (!session.phone_number) {
    await withdrawMessagePhoneNumber({ ...args, session, telegram_id });
  } else if (!session.name) {
    await withdrawMessageName({ ...args, session, telegram_id });
  } else if (!session.bet_id) {
    await withdrawMessageBetId({ ...args, session });
  } else if (!session.secret_code) {
    await withdrawMessageSecretCode({ ...args, session });
  }
};
