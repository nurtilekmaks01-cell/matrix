import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { SceneContext } from 'telegraf/typings/scenes';
import { addFaqActions } from '../actions';
import { TELEGRAM_ACTION_KEYBOARDS } from 'src/modules/telegram/actions/keyboard';
import { IAddFaqSession } from '../session';

interface IGenerateTextArgs {
  username: string;
}
const generateText = (args: IGenerateTextArgs) => {
  const { username } = args;
  const text = `
Are your sure ${username}

<a href="https://t.me/${username}">@${username}</a>
`;

  return text;
};

const generateKeyboard = () => {
  const inline_keyboard: InlineKeyboardButton[][] = [];

  inline_keyboard.push([
    { text: addFaqActions.SAVE, callback_data: addFaqActions.SAVE },
  ]);

  inline_keyboard.push([
    {
      text: TELEGRAM_ACTION_KEYBOARDS.CANCELED,
      callback_data: TELEGRAM_ACTION_KEYBOARDS.CANCELED,
    },
  ]);

  return inline_keyboard;
};

interface IAddFaqMessageArgs {
  ctx: SceneContext;
  text: string;
}
export const addFaqMessage = async (args: IAddFaqMessageArgs) => {
  const { ctx, text } = args;
  const session = ctx.session as IAddFaqSession;

  const replyText = generateText({ username: text });
  const inline_keyboard = generateKeyboard();

  session.username = text;
  await ctx.replyWithHTML(replyText, { reply_markup: { inline_keyboard } });
};
