import { SceneContext } from 'telegraf/typings/scenes';

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

  const text = generateText();

  await ctx.replyWithHTML(text);
};
