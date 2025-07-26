import { SceneContext } from 'telegraf/typings/scenes';

const generateText = () => {
  const text = `
Введите текст новости ниже. Вы также можете прикрепить медиафайлы, если это необходимо.`;

  return text;
};

interface IAdminNewsSceneEnterArgs {
  ctx: SceneContext;
}

export const adminNewsSceneEnter = async (args: IAdminNewsSceneEnterArgs) => {
  const { ctx } = args;

  const text = generateText();

  await ctx.replyWithHTML(text, {});
};
