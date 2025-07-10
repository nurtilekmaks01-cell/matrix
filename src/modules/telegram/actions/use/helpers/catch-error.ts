import { SceneContext } from 'telegraf/typings/scenes';

interface IOnUseCatchErrorArgs {
  ctx: SceneContext;
  group_id: string;
  error: any;
}
export const onUseCatchError = async (args: IOnUseCatchErrorArgs) => {
  const { ctx, group_id, error } = args;

  await ctx.telegram.sendMessage(group_id, `onUseCatchError: ${error}`);
};
