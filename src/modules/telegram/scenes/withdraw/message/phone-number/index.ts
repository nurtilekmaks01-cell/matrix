import { SceneContext } from 'telegraf/typings/scenes';
import { IWithdrawSession } from '../../session';
import { KeyupService } from 'src/helpers/keyup/keyup.service';
import { CreateKeyupDto } from 'src/helpers/keyup/dto/create-keyup.dto';
import { EKeyupTypeAction } from 'src/helpers/keyup/shared/type';
import { KeyboardButton } from 'telegraf/typings/core/types/typegram';
import { TELEGRAM_ACTION_KEYBOARDS } from 'src/modules/telegram/actions/keyboard';

const generateText = () => {
  const text = `
💳 <b>Укажите имя как на банковской карте</b>

Введите ваше имя точно так, как оно написано на лицевой стороне карты.

📌 Примеры:
• Иванов И.И.
• Петрова А.С.
• Smith JOHN
`;

  return text;
};

interface IKeyupCreateArgs {
  keyupService: KeyupService;
  value: string;
  telegram_id: string;
}
const createKeyup = async (args: IKeyupCreateArgs) => {
  const { keyupService, value, telegram_id } = args;

  const createKeyboard: CreateKeyupDto = {
    telegram_id,
    type: EKeyupTypeAction.PHONE_NUMBER,
    value,
  };

  await keyupService.create(createKeyboard);
};

interface IKeyboardArgs {
  keyupService: KeyupService;
  telegram_id: string;
}
const generateKeyboard = async (args: IKeyboardArgs) => {
  const { keyupService, telegram_id } = args;
  const keyboard: KeyboardButton[][] = [];

  const list = await keyupService.findAllWithOptions({
    where: { user: { telegram_id }, type: EKeyupTypeAction.NAME },
    take: 2,
    order: {
      createAt: 'DESC',
    },
  });

  for (const element of list) {
    keyboard.push([{ text: element.value }]);
  }

  keyboard.push([{ text: TELEGRAM_ACTION_KEYBOARDS.CANCELED }]);

  return keyboard;
};

interface IWithdrawPhoneNumber {
  ctx: SceneContext;
  text: string;
  session: IWithdrawSession;
  keyupService: KeyupService;
  telegram_id: string;
}
export const withdrawMessagePhoneNumber = async (
  args: IWithdrawPhoneNumber,
) => {
  const { ctx, session, text, keyupService, telegram_id } = args;

  const replyText = generateText();

  await createKeyup({ keyupService, telegram_id, value: text });

  const keyboard = await generateKeyboard({ keyupService, telegram_id });

  await ctx.replyWithHTML(replyText, {
    reply_markup: { keyboard, resize_keyboard: true },
  });

  session.phone_number = text;
};
