import { SceneContext } from 'telegraf/typings/scenes';

const generateText = () => {
  const text = `
Enter telegram username
`;

  return text;
};

interface IAddFaqSceneArgs {
  ctx: SceneContext;
}
export const addFaqSceneEnter = async (args: IAddFaqSceneArgs) => {
  const { ctx } = args;

  const text = generateText();

  await ctx.replyWithHTML(text);
};
