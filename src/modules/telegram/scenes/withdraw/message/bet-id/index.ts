import { SceneContext } from 'telegraf/typings/scenes';
import { IWithdrawSession } from '../../session';
import { KeyboardButton } from 'telegraf/typings/core/types/typegram';
import { TELEGRAM_ACTION_KEYBOARDS } from 'src/modules/telegram/actions/keyboard';
import { AxiosService } from 'src/helpers/axios/axios.service';

const generateText = () => {
  const text = `
📱 <b>Инструкция по выводу средств:</b>

1️⃣ Настройки
2️⃣ Вывести со счета
3️⃣ Наличными 
4️⃣ Укажите сумму
   🏙️ Город: <b>Бишкек</b>
   📍 Адрес: <b>PingoKg</b>
5️⃣ Подтвердить операцию
6️⃣ Получить код подтверждения
7️⃣ 📨 Отправить код нам

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

  // const findPlayer = await axiosService.findPlayer(text);

  // if (!findPlayer) {
  //   await ctx.reply(
  //     'Игрок не найден. Пожалуйста, проверьте ID и попробуйте снова.',
  //   );
  //   return;
  // }

  const replyText = generateText();
  const keyboard = generateKeyboard();

  await ctx.replyWithHTML(replyText, {
    reply_markup: { keyboard, resize_keyboard: true },
  });

  session.bet_id = text;
};
