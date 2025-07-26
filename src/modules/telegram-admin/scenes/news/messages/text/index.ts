import { SceneContext } from 'telegraf/typings/scenes';
import { generateNewsInlineKeyboard } from '../inline-keyboards';
import { IAdminNewsSession } from '../../session';
import { AutoReplyType } from 'src/helpers/auto-reply/dto/reply-message.dto';

interface IAdminNewsSceneEnterArgs {
  ctx: SceneContext;
  text: string;
}

export const newsTextMessage = async (args: IAdminNewsSceneEnterArgs) => {
  const { ctx, text } = args;

  const session = ctx.session as IAdminNewsSession;

  const inline_keyboard = generateNewsInlineKeyboard();

  await ctx.replyWithHTML(text, { reply_markup: { inline_keyboard } });

  session.text = text;
  session.type = AutoReplyType.TEXT;
};
