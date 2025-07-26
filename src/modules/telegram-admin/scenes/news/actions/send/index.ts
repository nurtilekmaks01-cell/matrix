import { SceneContext } from 'telegraf/typings/scenes';
import { IAdminNewsSession } from '../../session';
import { AutoReplyService } from 'src/helpers/auto-reply/auto-reply.service';

interface IAdminNewsSendArgs {
  ctx: SceneContext;
  autoReplyService: AutoReplyService;
}
export const newsSendActions = async (args: IAdminNewsSendArgs) => {
  const { ctx, autoReplyService } = args;

  const session = ctx.session as IAdminNewsSession;

  await autoReplyService.sendAutoReplyMessage({
    text: session.text,
    type: session.type,
    photo: session.photo,
  });
  await ctx.reply('News has been sent!');
};
