import { SceneContext } from 'telegraf/typings/scenes';

export enum TelegramScenes {
  REPLENISH = 'REPLENISH',
  WITHDRAW = 'WITHDRAW',
}

interface ILeaveSceneArgs {
  ctx: SceneContext;
}
export const leaveScene = async (args: ILeaveSceneArgs) => {
  const { ctx } = args;

  if (ctx.scene.current) {
    await ctx.scene.leave();
  }
};
