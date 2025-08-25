import { BankService } from 'src/modules/bank/bank.service';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { SceneContext } from 'telegraf/typings/scenes';

const generateText = () => {
  const text = `
Выберите банк для редактирования`;

  return text;
};

interface IGInlineKeyboardArgs {
  bankService: BankService;
}
const generateInlineKeyboard = async (args: IGInlineKeyboardArgs) => {
  const { bankService } = args;

  const inline_keyboard: InlineKeyboardButton[][] = [];

  const list = await bankService.findAllWithOptions({});

  for (const bank of list) {
    inline_keyboard.push([
      { text: bank.name, callback_data: `edit_${bank.id}` },
    ]);
  }

  return inline_keyboard;
};

interface IEditBankSceneEnterArgs {
  ctx: SceneContext;
  bankService: BankService;
}
export const editBankSceneEnter = async (args: IEditBankSceneEnterArgs) => {
  const { ctx, bankService } = args;

  const text = generateText();

  const inline_keyboard = await generateInlineKeyboard({ bankService });

  await ctx.replyWithHTML(text, { reply_markup: { inline_keyboard } });
};
