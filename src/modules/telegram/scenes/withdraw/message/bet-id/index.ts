import { SceneContext } from 'telegraf/typings/scenes';
import { IWithdrawSession } from '../../session';
import { KeyboardButton } from 'telegraf/typings/core/types/typegram';
import { TELEGRAM_ACTION_KEYBOARDS } from 'src/modules/telegram/actions/keyboard';

const generateText = () => {
  const text = `
Заходим👇🏻

⭕️1. Настройки!
⭕️2. Вывести со счета!
⭕️3. Наличными 
⭕️4. Сумму для Вывода!
(Выбираем город , Бишкек Улица Babla.Kg)
⭕️5. Подтвердить
⭕️6. Получить Код!
🛑7. Отправить его нам
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
}
export const withdrawMessageBetId = async (args: IWithdrawBetIdArgs) => {
  const { ctx, session, text } = args;

  const replyText = generateText();
  const keyboard = generateKeyboard();

  await ctx.replyWithHTML(replyText, {
    reply_markup: { keyboard, resize_keyboard: true },
  });

  session.bet_id = text;
};
