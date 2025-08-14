import { PhotoSize } from 'telegraf/typings/core/types/typegram';
import { SceneContext } from 'telegraf/typings/scenes';
import { clearReplenishSession, IReplenishSession } from '../../session';
import { userReplenishSend } from './helpers/user.helper';
import { groupReplenishSend } from './helpers/group.helper';
import { ReplenishService } from 'src/modules/replenish/replenish.service';
import { leaveScene } from '../../..';
import { FaqService } from 'src/helpers/faq/faq.service';
import { QrcodeService } from 'src/helpers/qrcode/qrcode.service';
import { AxiosFileService } from 'src/helpers/axios/services/file.service';
import {
  checkPaymentUniversal,
  errorPaymentUniversalMessageText,
} from './helpers/price.helper';

interface IPhotoArgs {
  ctx: SceneContext;
  photo: PhotoSize[];
  replenishService: ReplenishService;
  faqService: FaqService;
  qrcodeService: QrcodeService;
  axiosFileService: AxiosFileService;
}
export const replenishPhoto = async (args: IPhotoArgs) => {
  const {
    ctx,
    photo,
    replenishService,
    faqService,
    qrcodeService,
    axiosFileService,
  } = args;

  const session = ctx.session as IReplenishSession;

  const photo_id = photo?.[0]?.file_id;

  const popPhoto = photo.pop();

  if (!popPhoto) {
    return;
  }

  const loadingMessage = await ctx.replyWithHTML('⏳');

  const { href } = await ctx.telegram.getFileLink(popPhoto.file_id);

  const buffer = await axiosFileService.getBufferResponse({
    href,
  });

  const text = await qrcodeService.getImageText({ buffer });

  console.log(text, 'text', 'jj');

  const result = checkPaymentUniversal(
    text,
    Number(Number(session.price || '').toFixed(2)),
  );

  if (!result.success) {
    await ctx.reply(result.error || errorPaymentUniversalMessageText());
    return;
  }
  console.log(result); // { success: true, amount: 50 }

  const message = await userReplenishSend({ ctx, session, faqService });
  await groupReplenishSend({
    ctx,
    photo_id,
    session,
    replenishService,
    message_id: String(message.message_id),
  });

  await ctx.deleteMessage(loadingMessage.message_id);
  clearReplenishSession(session);
  await leaveScene({ ctx });
};
