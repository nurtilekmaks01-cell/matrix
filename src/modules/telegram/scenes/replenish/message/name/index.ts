import { SceneContext } from 'telegraf/typings/scenes';
import { IReplenishSession } from '../../session';
import { KeyupService } from 'src/helpers/keyup/keyup.service';
import { KeyboardButton } from 'telegraf/typings/core/types/typegram';
import { CreateKeyupDto } from 'src/helpers/keyup/dto/create-keyup.dto';
import { EKeyupTypeAction } from 'src/helpers/keyup/shared/type';
import { TELEGRAM_ACTION_KEYBOARDS } from 'src/modules/telegram/actions/keyboard';
import { BOOKMAKER_TEXT, EBookmakers } from 'src/shared/types/telegram';
import { assets } from 'src/assets';

const generateText = (bookmaker: EBookmakers) => {
  const textBookmaker = BOOKMAKER_TEXT[bookmaker || EBookmakers.XBET];
  const text = `
📋 <b>Идентификатор счета ${textBookmaker}:</b>
Пожалуйста, введите ваш уникальный ID аккаунта <b>${textBookmaker}</b>. 
Его можно найти в личном кабинете.`;
  return text;
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
    order: { createAt: 'DESC' },
  });

  for (const element of list) {
    keyboard.push([{ text: element.value }]);
  }

  keyboard.push([{ text: TELEGRAM_ACTION_KEYBOARDS.CANCELED }]);

  return keyboard;
};

interface IKeyupCreateArgs {
  keyupService: KeyupService;
  name: string;
  telegram_id: string;
}
const createKeyupName = async (args: IKeyupCreateArgs) => {
  const { keyupService, telegram_id, name } = args;

  const createKeyupDto: CreateKeyupDto = {
    telegram_id,
    type: EKeyupTypeAction.NAME,
    value: name,
  };

  await keyupService.create(createKeyupDto);
};

interface INameArgs {
  ctx: SceneContext;
  session: IReplenishSession;
  text: string;
  keyupService: KeyupService;
  telegram_id: string;
}
export const replenishMessageName = async (args: INameArgs) => {
  const { ctx, session, text, keyupService, telegram_id } = args;

  session.name = text;

  const replyText = generateText(session.bet.type);

  await createKeyupName({ keyupService, name: text, telegram_id });

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
      reply_markup: { keyboard, resize_keyboard: true },
      parse_mode: 'HTML',
    },
  );
};
