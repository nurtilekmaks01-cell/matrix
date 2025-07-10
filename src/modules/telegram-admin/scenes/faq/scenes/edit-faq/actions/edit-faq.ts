import { Faq } from 'src/helpers/faq/entities/faq.entity';
import { FaqService } from 'src/helpers/faq/faq.service';
import { SceneContext } from 'telegraf/typings/scenes';

const generateNotFountFaqText = () => {
  const text = `
Faq is not found
`;

  return text;
};

interface IGenerateTextArgs {
  faq: Faq;
}
const generateText = (args: IGenerateTextArgs) => {
  const { faq } = args;
  const text = `
Change change
${faq.username}
  `;

  return text;
};

interface IEditFaqAction {
  ctx: SceneContext;
  faqService: FaqService;
}
export const editFaqActions = async (args: IEditFaqAction) => {
  const { ctx, faqService } = args;
  const callbackQuery = ctx.callbackQuery;

  if (!callbackQuery) return;
  if (!('data' in callbackQuery)) return;
  const callback_data = callbackQuery.data;

  const faqId = String(callback_data).replace('edit_', '');

  console.log(faqId);

  const faq = await faqService.findOne(Number(faqId));

  if (!faq) {
    const text = generateNotFountFaqText();

    await ctx.replyWithHTML(text);

    return;
  }

  faqService.changeFaq(faq);

  const text = generateText({ faq });

  await ctx.replyWithHTML(text);
};
