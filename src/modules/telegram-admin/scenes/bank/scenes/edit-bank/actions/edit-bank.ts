import { BankService } from 'src/modules/bank/bank.service';
import { SceneContext } from 'telegraf/typings/scenes';

const generateText = () => {
  const text = `
Successfully added
`;

  return text;
};

interface IEditBankArgs {
  ctx: SceneContext;
  bankService: BankService;
}
export const editBankACtion = async (args: IEditBankArgs) => {
  const { ctx, bankService } = args;

  const callbackQuery = ctx.callbackQuery;

  if (!callbackQuery) return;
  if (!('data' in callbackQuery)) return;
  const callback_data = callbackQuery.data;

  const bankId = String(callback_data).replace('edit_', '');

  const bank = await bankService.findOneWithOptions({
    where: { id: Number(bankId) },
  });

  if (bank) {
    await bankService.changeBank(bank);

    const text = generateText();

    await ctx.replyWithHTML(text);
  }
};
