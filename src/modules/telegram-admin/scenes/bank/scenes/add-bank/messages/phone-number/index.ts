import { SceneContext } from 'telegraf/typings/scenes';
import { IAddBankSession } from '../../session';

const generateText = () => {
  const text = `
Send qr code`;

  return text;
};

interface IPhoneNumberArgs {
  ctx: SceneContext;
  text: string;
  session: IAddBankSession;
}
export const onMessagePhoneNumber = async (args: IPhoneNumberArgs) => {
  const { ctx, text, session } = args;

  session.phone_number = text;

  const replyText = generateText();

  await ctx.replyWithHTML(replyText);
};
