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

  await ctx.replyWithHTML(`
💰Баланс: <b>${formatRussianPrice(response?.Balance)}</b> сомов
💰 Лимит: <b>${formatRussianPrice(response?.Limit)}</b> сомов
`);
};
