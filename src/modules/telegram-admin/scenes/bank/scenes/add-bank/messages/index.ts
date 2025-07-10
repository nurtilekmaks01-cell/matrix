import { SceneContext } from 'telegraf/typings/scenes';
import { IAddBankSession } from '../session';
import { onMessagePhoneNumber } from './phone-number';

interface IMessageAddBankArgs {
  ctx: SceneContext;
  text: string;
}
export const onMessageAddBank = async (args: IMessageAddBankArgs) => {
  const { ctx } = args;

  const session = ctx.session as IAddBankSession;

  if (!session.phone_number) {
    await onMessagePhoneNumber({ ...args, session });
  }
};
