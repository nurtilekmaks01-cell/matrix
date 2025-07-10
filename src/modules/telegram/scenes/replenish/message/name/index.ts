import { SceneContext } from 'telegraf/typings/scenes';
import { IReplenishSession } from '../../session';
import { KeyupService } from 'src/helpers/keyup/keyup.service';
import { KeyboardButton } from 'telegraf/typings/core/types/typegram';
import { CreateKeyupDto } from 'src/helpers/keyup/dto/create-keyup.dto';
import { EKeyupTypeAction } from 'src/helpers/keyup/shared/type';
import { el } from 'date-fns/locale';
import { TELEGRAM_ACTION_KEYBOARDS } from 'src/modules/telegram/actions/keyboard';

const generateText = () => {
  const text = `
🆔 Введите ID вашего счета 1xbet
`;

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

  const replyText = generateText();

  await createKeyupName({ keyupService, name: text, telegram_id });

  const keyboard = await generateKeyboard({ keyupService, telegram_id });

  await ctx.replyWithPhoto(
    { source: session.bet.assets.id },
    { caption: replyText, reply_markup: { keyboard, resize_keyboard: true } },
  );
};
