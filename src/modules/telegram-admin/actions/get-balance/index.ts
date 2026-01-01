import { AxiosService } from 'src/helpers/axios/axios.service';
import { formatRussianPrice } from 'src/shared/utils/helpers/price.helper';
import { SceneContext } from 'telegraf/typings/scenes';

interface IGetBalanceArgs {
  ctx: SceneContext;
  axiosService: AxiosService;
}
export const getBalance = async (args: IGetBalanceArgs) => {
  const { ctx, axiosService } = args;

  const response = await axiosService.getBalance();
  const responseMelbet = await axiosService.getMelbetBalance();

  await ctx.replyWithHTML(`
<blockquote>1XBET</blockquote>
💰Баланс: <b>${formatRussianPrice(response?.Balance || 0)}</b> сомов
💰 Лимит: <b>${formatRussianPrice(response?.Limit || 0)}</b> сомов

<blockquote>MELBET</blockquote>
💰Баланс: <b>${formatRussianPrice(responseMelbet?.Balance || 0)}</b> сомов
💰 Лимит: <b>${formatRussianPrice(responseMelbet?.Limit || 0)}</b> сомов
`);
};
