import { SceneContext } from 'telegraf/typings/scenes';
import { clearReplenishSession, IReplenishSession } from '../session';
import {
  InlineKeyboardButton,
  KeyboardButton,
} from 'telegraf/typings/core/types/typegram';
import { TELEGRAM_ACTION_KEYBOARDS } from 'src/modules/telegram/actions/keyboard';
import { KeyupService } from 'src/helpers/keyup/keyup.service';
import { EKeyupTypeAction } from 'src/helpers/keyup/shared/type';
import { BOOKMAKER_TEXT, EBookmakers } from 'src/shared/types/telegram';

const generateText = () => {
  const text = `🔐 <b>Идентификация:</b>\n\nВведите ваше реальное имя. Это необходимо для безопасности операций и персонального обслуживания.`;
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
    where: { user: { telegram_id }, type: EKeyupTypeAction.NAME },
    take: 2,
    order: { createAt: 'DESC' },
  });

  for (const element of list) {
    keyboard.push([{ text: element.value }]);
  }

  keyboard.push([{ text: TELEGRAM_ACTION_KEYBOARDS.CANCELED }]);

  return keyboard;
};

interface IWithoutBookmaker extends IReplenishSceneEnterArgs {
  telegram_id: string;
}
export const replenishSceneWithoutBookmaker = async (
  args: IWithoutBookmaker,
) => {
  const { ctx, keyupService, telegram_id } = args;

  const text = generateText();
  const keyboard = await generateKeyboard({ keyupService, telegram_id });

  await ctx.replyWithHTML(text, {
    reply_markup: { keyboard, resize_keyboard: true },
  });
};

interface IReplenishSceneEnterArgs {
  ctx: SceneContext;
  keyupService: KeyupService;
}
export const replenishSceneEnter = async (args: IReplenishSceneEnterArgs) => {
  const { ctx } = args;
  const from = ctx.from;
  const session = ctx.session as IReplenishSession;

  if (!from) return;

  const telegram_id = String(from.id);

  console.log(session, 'is main');

  if (!session.is_main) {
    await replenishSceneWithoutBookmaker({ ...args, telegram_id });
  } else {
    const inline_keyboard: InlineKeyboardButton[][] = [
      [
        {
          text: BOOKMAKER_TEXT[EBookmakers.XBET],
          callback_data: EBookmakers.XBET,
        },
        {
          text: BOOKMAKER_TEXT[EBookmakers.WIN],
          callback_data: EBookmakers.WIN,
        },
      ],
    ];

    const message = await ctx.replyWithHTML(`📝 <b>Выбор операции</b>`, {
      reply_markup: { inline_keyboard },
    });

    session.bookmaker_message_id = message.message_id;
  }

  clearReplenishSession(session);
};
