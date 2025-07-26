import { PhotoSize } from 'telegraf/typings/core/types/typegram';
import { SceneContext } from 'telegraf/typings/scenes';
import { generateNewsInlineKeyboard } from '../inline-keyboards';
import { IAdminNewsSession } from '../../session';
import { AutoReplyType } from 'src/helpers/auto-reply/dto/reply-message.dto';

interface IAdminNewsSceneEnterArgs {
  ctx: SceneContext;
  photo: PhotoSize[];
}
export const newsPhotoMessage = async (args: IAdminNewsSceneEnterArgs) => {
  const { ctx, photo } = args;

  const session = ctx.session as IAdminNewsSession;

  const fileId = photo[3].file_id;

  const message = ctx.message;

  const caption =
    message && 'caption' in message && typeof message.caption === 'string'
      ? message.caption
      : '';

  const inline_keyboard = generateNewsInlineKeyboard();

  const file = await ctx.telegram.getFile(fileId);
  const fileLink = await ctx.telegram.getFileLink(file.file_id);

  await ctx.replyWithPhoto(
    { url: fileLink.href },
    {
      caption,
      reply_markup: { inline_keyboard },
    },
  );

  session.text = caption || session.text || '';
  session.photo = fileLink.href;
  session.type = AutoReplyType.PHOTO;
};
