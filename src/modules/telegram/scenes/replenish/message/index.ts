import { SceneContext } from 'telegraf/typings/scenes';
import { IReplenishSession } from '../session';
import { replenishMessageName } from './name';
import { replenishMessageBetId } from './bet-id';
import { replenishMessagePrice } from './price';
import { KeyupService } from 'src/helpers/keyup/keyup.service';
import { BankService } from 'src/modules/bank/bank.service';

interface IReplenishMessageArgs {
  ctx: SceneContext;
  text: string;
  keyupService: KeyupService;
  bankService: BankService;
}
export const onReplenishMessage = async (args: IReplenishMessageArgs) => {
  const { ctx } = args;
  const from = ctx.from;

  if (!from) return;

  const telegram_id = String(from.id);

  const session = ctx.session as IReplenishSession;

  if (!session.name) {
    await replenishMessageName({ ...args, session, telegram_id });
  } else if (!session.bet_id) {
    await replenishMessageBetId({ ...args, session, telegram_id });
  } else if (!session.price) {
    await replenishMessagePrice({ ...args, session });
  }
};
