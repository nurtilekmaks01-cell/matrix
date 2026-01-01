import { SceneContext } from 'telegraf/typings/scenes';
import { replenishUserText } from '../constants/user.constant';
import { IReplenishSession } from '../../../session';
import { FaqService } from 'src/helpers/faq/faq.service';

interface IUserArgs {
  ctx: SceneContext;
  session: IReplenishSession;
  faqService: FaqService;
}
export const userReplenishSend = async (args: IUserArgs) => {
  const { ctx, session, faqService } = args;

  const userText = replenishUserText({
    bet_id: session.bet_id as string,
    price: session.price as string,
    faqService,
    bookmaker: session.bet.type,
  });

  return await ctx.replyWithHTML(userText);
};
