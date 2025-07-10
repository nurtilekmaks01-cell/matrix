import { FaqService } from 'src/helpers/faq/faq.service';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { SceneContext } from 'telegraf/typings/scenes';

interface IGenerateInlineKeyboardArgs {
  faqService: FaqService;
}
const generateInlineKeyboard = async (args: IGenerateInlineKeyboardArgs) => {
  const { faqService } = args;

  const list = await faqService.findAll();

  const inline_keyboard: InlineKeyboardButton[][] = [];

  for (const element of list) {
    inline_keyboard.push([
      { text: element.username, callback_data: `edit_${element.id}` },
    ]);
  }

  return inline_keyboard;
};

const generateText = () => {
  const text = `
Faq list`;

  return text;
};

interface IEditFaqEnterArgs {
  ctx: SceneContext;
  faqService: FaqService;
}
export const editFaqSceneEnter = async (args: IEditFaqEnterArgs) => {
  const { ctx } = args;

  const text = generateText();
  const inline_keyboard = await generateInlineKeyboard({ ...args });

  console.log(inline_keyboard, 'inline', ctx.scene.current?.id);

  await ctx.replyWithHTML(text, { reply_markup: { inline_keyboard } });
};
