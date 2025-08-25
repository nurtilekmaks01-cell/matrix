import { BankService } from 'src/modules/bank/bank.service';
import { Bank } from 'src/modules/bank/entities/bank.entity';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { SceneContext } from 'telegraf/typings/scenes';

const generateText = () => {
  const text = `
Выберите банк для редактирования:
`;

  return text;
};

interface IGenerateInlineKeyboard {
  bank: Bank;
}
const generateInlineKeyboard = (args: IGenerateInlineKeyboard) => {
  const { bank } = args;

  const inline_keyboard: InlineKeyboardButton[][] = [];

  inline_keyboard.push([
    {
      text: 'Изменить',
      callback_data: `change_${bank.id}`,
    },
    {
      text: 'Удалить',
      callback_data: `delete_${bank.id}`,
    },
  ]);

  return inline_keyboard;
};

interface IEditBankListArgs {
  ctx: SceneContext;
  bankService: BankService;
}

export const editBankListAction = async (args: IEditBankListArgs) => {
  const { ctx, bankService } = args;

  const callbackQuery = ctx.callbackQuery;

  if (!callbackQuery) return;
  if (!('data' in callbackQuery)) return;
  const callback_data = callbackQuery.data;

  const bankId = String(callback_data).replace('edit_', '');

  const numberBankId = Number(bankId);

  const bank = await bankService.findOneWithOptions({
    where: { id: numberBankId },
  });

  if (bank) {
    const text = generateText();
    const inline_keyboard = generateInlineKeyboard({ bank });
    await ctx.reply(text, {
      reply_markup: {
        inline_keyboard,
      },
    });
  }
};
