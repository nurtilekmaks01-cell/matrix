import { BankService } from 'src/modules/bank/bank.service';
import { SceneContext } from 'telegraf/typings/scenes';

const generateText = () => {
  const text = `
Успешно удалено
`;

  return text;
};

interface IEditBankArgs {
  ctx: SceneContext;
  bankService: BankService;
}
export const deleteBankACtion = async (args: IEditBankArgs) => {
  const { ctx, bankService } = args;

  const callbackQuery = ctx.callbackQuery;

  console.log(callbackQuery, 'callbackQuery');

  if (!callbackQuery) return;
  if (!('data' in callbackQuery)) return;
  const callback_data = callbackQuery.data;

  const bankId = String(callback_data).replace('delete_', '');

  const bank = await bankService.findOneWithOptions({
    where: { id: Number(bankId) },
  });
  console.log(bank, 'bank');

  if (bank) {
    await bankService.remove(bank.id);

    const text = generateText();

    await ctx.replyWithHTML(text);
  }
};
