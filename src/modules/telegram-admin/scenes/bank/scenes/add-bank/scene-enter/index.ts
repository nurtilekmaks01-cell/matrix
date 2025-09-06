import { SceneContext } from 'telegraf/typings/scenes';
import { clearAddBankSession, IAddBankSession } from '../session';

const generateText = () => {
  const text = `
Enter your bank number
`;

  return text;
};

interface IAddBankSceneEnterArgs {
  ctx: SceneContext;
}
export const addBankSceneEnter = async (args: IAddBankSceneEnterArgs) => {
  const { ctx } = args;
  const session = ctx.session as IAddBankSession;

  const text = generateText();

  await ctx.replyWithHTML(text);
  clearAddBankSession(session);
};
