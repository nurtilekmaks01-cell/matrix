import { SceneContext } from 'telegraf/typings/scenes';
import { IAddFaqSession } from '../session';
import { FaqService } from 'src/helpers/faq/faq.service';
import { CreateFaqDto } from 'src/helpers/faq/dto/create-faq.dto';
import { Faq } from 'src/helpers/faq/entities/faq.entity';

interface IGenerateTextArgs {
  faq: Faq;
}
const generateText = (args: IGenerateTextArgs) => {
  const { faq } = args;

  const text = `
Create Faq
${faq.username}  
`;

  return text;
};

interface IAddFaqActionArgs {
  ctx: SceneContext;
  faqService: FaqService;
}
export const saveFaqAction = async (args: IAddFaqActionArgs) => {
  const { ctx, faqService } = args;

  const session = ctx.session as IAddFaqSession;

  const username = session.username as string;

  const createFaqDto: CreateFaqDto = {
    username,
    link: `https://t.me/${username}`,
  };
  const faq = await faqService.create(createFaqDto);

  const text = generateText({ faq });
  await ctx.replyWithHTML(text);
};
