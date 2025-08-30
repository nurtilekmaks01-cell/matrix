import { SceneContext } from 'telegraf/typings/scenes';
import { clearWithdrawSession, IWithdrawSession } from '../../session';
import { WithdrawService } from 'src/modules/withdraw/withdraw.service';
import { EBanks } from 'src/modules/bank/shared/types';
import { sendWithdrawGroup } from './helpers/group';
import { TelegramConfig } from 'src/helpers/config/services/telegram.config';
import { leaveScene } from '../../..';
import { FaqService } from 'src/helpers/faq/faq.service';
import { KeyboardButton } from 'telegraf/typings/core/types/typegram';
import { TELEGRAM_ACTION_KEYBOARDS } from 'src/modules/telegram/actions/keyboard';
import { AxiosService } from 'src/helpers/axios/axios.service';

interface IUserTextArgs {
  session: IWithdrawSession;
  faqService: FaqService;
}
const generateUserText = (args: IUserTextArgs) => {
  const { faqService, session } = args;
  const faq = faqService.faq;

  const text = `
✅Ваша заявка принята на проверку!
🆔ID 1XBET: ${session.bet_id}

💰Комиссия: 0%
Способ: ${session.bank || EBanks.MBANK}
💵Сумма: ${session.price || 'не указана'}

⚠️ Вывод занимает от 1 минуты до 24 часа

Пожалуйста подождите!

✅Вы получите уведомление о зачислении средств!

Если возникли проблемы 👇
👨‍💻Оператор: <a href="${faq.link}">${faq.username}</a>
`;

  return text;
};

const generateKeyboard = () => {
  const keyboard: KeyboardButton[][] = [];

  keyboard.push([{ text: TELEGRAM_ACTION_KEYBOARDS.MAIN }]);

  return keyboard;
};

interface IWithdrawSecretCode {
  ctx: SceneContext;
  session: IWithdrawSession;
  text: string;
  withdrawService: WithdrawService;
  telegramConfig: TelegramConfig;
  faqService: FaqService;
  axiosService: AxiosService;
}
export const withdrawMessageSecretCode = async (args: IWithdrawSecretCode) => {
  const { ctx, session, text, faqService, axiosService } = args;

  const payout = await axiosService.payout(String(session.bet_id), text);

  if (!payout?.Success) {
    await ctx.reply(
      payout.Message ||
        'Ошибка при выводе средств. Пожалуйста, попробуйте снова.',
    );
    return;
  }

  session.secret_code = text;
  session.price = String(payout.Summa);
  // session.price = '-10000';

  const replyText = generateUserText({ session, faqService });
  const keyboard = generateKeyboard();

  const message = await ctx.replyWithHTML(replyText, {
    reply_markup: { keyboard, resize_keyboard: true },
  });
  const message_id = String(message.message_id);

  await sendWithdrawGroup({ ...args, message_id });

  clearWithdrawSession(session);
  await leaveScene({ ctx });
};
