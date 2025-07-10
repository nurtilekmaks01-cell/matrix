import { PhotoSize } from 'telegraf/typings/core/types/typegram';
import { SceneContext } from 'telegraf/typings/scenes';
import { clearReplenishSession, IReplenishSession } from '../../session';
import { userReplenishSend } from './helpers/user.helper';
import { groupReplenishSend } from './helpers/group.helper';
import { ReplenishService } from 'src/modules/replenish/replenish.service';
import { leaveScene } from '../../..';
import { FaqService } from 'src/helpers/faq/faq.service';

interface IPhotoArgs {
  ctx: SceneContext;
  photo: PhotoSize[];
  replenishService: ReplenishService;
  faqService: FaqService;
}
export const replenishPhoto = async (args: IPhotoArgs) => {
  const { ctx, photo, replenishService, faqService } = args;

  const session = ctx.session as IReplenishSession;

  const photo_id = photo?.[0]?.file_id;

  const message = await userReplenishSend({ ctx, session, faqService });
  await groupReplenishSend({
    ctx,
    photo_id,
    session,
    replenishService,
    message_id: String(message.message_id),
  });

  clearReplenishSession(session);
  await leaveScene({ ctx });
};
