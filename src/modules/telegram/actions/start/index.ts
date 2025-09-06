import { formatUsername } from 'src/shared/utils/helpers/user.helper';
import {
  InlineKeyboardButton,
  User,
} from 'telegraf/typings/core/types/typegram';
import { SceneContext } from 'telegraf/typings/scenes';
import { WELCOME_MESSAGE } from './constants/messages.constant';
import { START_ACTIONS, START_ACTIONS_TEXT } from './constants/action.constant';
import { FaqService } from 'src/helpers/faq/faq.service';

interface IGenerateTextArgs {
  from: User | undefined;
  faqService: FaqService;
}
const generateText = (args: IGenerateTextArgs) => {
  const { from, faqService } = args;

  const text = WELCOME_MESSAGE({ username: formatUsername(from), faqService });

  return text;
};

const generateInlineKeyboard = () => {
  const inlineKeyboard: InlineKeyboardButton[][] = [];

  inlineKeyboard.push([
    {
      text: START_ACTIONS_TEXT[START_ACTIONS.replenish],
      callback_data: START_ACTIONS.replenish,
    },
    {
      text: START_ACTIONS_TEXT[START_ACTIONS.withdraw],
      callback_data: START_ACTIONS.withdraw,
    },
  ]);

  return inlineKeyboard;
};

const generateActionText = () => {
  const text = `
📝 <b>Выбор операции</b>
`;

  return text;
};

interface IChooseActionsArgs {
  ctx: SceneContext;
}
const chooseActions = async (args: IChooseActionsArgs) => {
  const { ctx } = args;

  const inline_keyboard = generateInlineKeyboard();

  const text = generateActionText();

  await ctx.replyWithHTML(text, { reply_markup: { inline_keyboard } });
};

interface IOnStartActionArgs {
  ctx: SceneContext;
  faqService: FaqService;
}
export const onStartAction = async (args: IOnStartActionArgs) => {
  const { ctx, faqService } = args;

  const from = ctx.from;

  const text = generateText({ from, faqService });

  await ctx.replyWithHTML(text, {
    reply_markup: { keyboard: [], remove_keyboard: true },
  });

  await chooseActions({ ctx });
};
