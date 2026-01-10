import { SceneContext } from 'telegraf/typings/scenes';
import { IWithdrawSession } from '../../session';
import { KeyupService } from 'src/helpers/keyup/keyup.service';
import { CreateKeyupDto } from 'src/helpers/keyup/dto/create-keyup.dto';
import { EKeyupTypeAction } from 'src/helpers/keyup/shared/type';
import { KeyboardButton } from 'telegraf/typings/core/types/typegram';
import { TELEGRAM_ACTION_KEYBOARDS } from 'src/modules/telegram/actions/keyboard';
import { EBookmakers } from 'src/shared/types/telegram';
import { assets } from 'src/assets';

const generateText = (bookmaker: EBookmakers) => {
  const text = `📋 <b>Идентификатор счета ${bookmaker}:</b>\n\nПожалуйста, введите ваш уникальный ID аккаунта <b>${bookmaker}</b>. Его можно найти в личном кабинете.`;
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
    type: EKeyupTypeAction.NAME,
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
    where: { user: { telegram_id }, type: EKeyupTypeAction.BOOKMAKER },
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

interface IWithdrawMessageNameArgs {
  ctx: SceneContext;
  text: string;
  session: IWithdrawSession;
  keyupService: KeyupService;
  telegram_id: string;
}
export const withdrawMessageName = async (args: IWithdrawMessageNameArgs) => {
  const { ctx, keyupService, session, telegram_id, text } = args;

  const replyText = generateText(session.bet.type);

  await createKeyup({ keyupService, telegram_id, value: text });

  const keyboard = await generateKeyboard({ keyupService, telegram_id });

  const sources = {
    [EBookmakers.MELBET]: assets.melbet.id,
    [EBookmakers.XBET]: assets.xbet.id,
    [EBookmakers.WIN]: assets.win.id,
  };

  const source = sources[session.bet.type || EBookmakers.XBET];

  await ctx.replyWithPhoto(
    { source },
    {
      caption: replyText,
      parse_mode: 'HTML',
      reply_markup: { keyboard, resize_keyboard: true },
    },
  );

  session.name = text;
};
