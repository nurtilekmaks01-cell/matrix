import { SceneContext } from 'telegraf/typings/scenes';
import { clearReplenishSession, IReplenishSession } from '../session';
import { KeyboardButton } from 'telegraf/typings/core/types/typegram';
import { TELEGRAM_ACTION_KEYBOARDS } from 'src/modules/telegram/actions/keyboard';
import { KeyupService } from 'src/helpers/keyup/keyup.service';
import { EKeyupTypeAction } from 'src/helpers/keyup/shared/type';

const generateText = () => {
  const text = `👤 <b>Введите ваше имя:</b>\n\nПожалуйста, укажите ваше реальное имя для дальнейшей идентификации.`;
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

interface IReplenishSceneEnterArgs {
  ctx: SceneContext;
  keyupService: KeyupService;
}
export const replenishSceneEnter = async (args: IReplenishSceneEnterArgs) => {
  const { ctx, keyupService } = args;
  const from = ctx.from;
  const session = ctx.session as IReplenishSession;

  if (!from) return;

  const telegram_id = String(from.id);

  const text = generateText();
  const keyboard = await generateKeyboard({ keyupService, telegram_id });

  await ctx.replyWithHTML(text, {
    reply_markup: { keyboard, resize_keyboard: true },
  });

  clearReplenishSession(session);
};
