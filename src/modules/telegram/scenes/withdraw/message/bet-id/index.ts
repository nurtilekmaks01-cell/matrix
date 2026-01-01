import { SceneContext } from 'telegraf/typings/scenes';
import { IWithdrawSession } from '../../session';
import { KeyboardButton } from 'telegraf/typings/core/types/typegram';
import { TELEGRAM_ACTION_KEYBOARDS } from 'src/modules/telegram/actions/keyboard';
import { AxiosService } from 'src/helpers/axios/axios.service';
import { assets } from 'src/assets';
import { EBookmakers } from 'src/shared/types/telegram';

const generateText = () => {
  const text = `
📱 <b>Инструкция по выводу средств:</b>
1. Подтвердить операцию
2. Получить код подтверждения
3. 📨 Отправить код нам

⚡ После этого получите ваши средства!
`;

  return text;
};

const generateKeyboard = () => {
  const keyboard: KeyboardButton[][] = [];

  keyboard.push([{ text: TELEGRAM_ACTION_KEYBOARDS.CANCELED }]);

  return keyboard;
};

interface IWithdrawBetIdArgs {
  ctx: SceneContext;
  session: IWithdrawSession;
  text: string;
  axiosService: AxiosService;
}
export const withdrawMessageBetId = async (args: IWithdrawBetIdArgs) => {
  const { ctx, session, text, axiosService } = args;

  if (session.bet.type === EBookmakers.MELBET) {
    const findPlayer = await axiosService.getMelbetUserInfo(text);

    console.log(findPlayer, 'find player');

    if (!findPlayer?.UserId) {
      await ctx.reply(
        'Игрок не найден. Пожалуйста, проверьте ID и попробуйте снова.',
      );
      return;
    }

    if (findPlayer.CurrencyId !== 7) {
      await ctx.reply(
        '❌ Неверная валюта. Операция доступна только для игроков с валютой KGS (сом).',
      );
      return;
    }
  }

  const replyText = generateText();
  const keyboard = generateKeyboard();

  const firstSources = {
    [EBookmakers.XBET]: assets.xbet.mobcash,
    [EBookmakers.MELBET]: assets.melbet.cash,
  };

  const firstSource = firstSources[session.bet.type || EBookmakers.XBET];

  const secondSources = {
    [EBookmakers.XBET]: assets.xbet.mobcash,
    [EBookmakers.MELBET]: assets.melbet.street,
  };

  const secondSource = secondSources[session.bet.type || EBookmakers.XBET];

  await ctx.sendMediaGroup([
    {
      type: 'photo',
      media: { source: firstSource },
      caption: replyText,
      parse_mode: 'HTML',
    },
    { type: 'photo', media: { source: secondSource } },
  ]);

  session.bet_id = text;
};
