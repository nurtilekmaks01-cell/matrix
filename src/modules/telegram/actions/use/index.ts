import { TelegramConfig } from 'src/helpers/config/services/telegram.config';
import { SceneContext } from 'telegraf/typings/scenes';
import { onUseCatchError } from './helpers/catch-error';
import { UserService } from 'src/modules/user/user.service';
import { ensureUserExists } from './helpers/existing-user';
import { User } from 'telegraf/typings/core/types/typegram';
import { isBanedText } from './helpers/is-baned';
import { FileTelegramService } from 'src/helpers/local-file/services/telegram.service';
import { botStoppingHelper } from './helpers/bot-stopping';

interface IOnUseActionArgs {
  ctx: SceneContext;
  next: () => Promise<void>;
  telegramConfig: TelegramConfig;
  userService: UserService;
  fileTelegramService: FileTelegramService;
}
export const onUseAction = async (args: IOnUseActionArgs) => {
  const { ctx, next, telegramConfig, userService, fileTelegramService } = args;
  const chat = ctx.chat;
  const from = ctx.from as User;
  const callback = ctx.callbackQuery;

  const error_group_id = telegramConfig.error_chat_id;

  if (chat?.type === 'supergroup') {
    if (!callback) {
      return;
    }
  }

  const { bot_starting } = await fileTelegramService.readTelegramJsonFile();

  if (!bot_starting) {
    await botStoppingHelper({ ctx });
    return;
  }

  const user = await ensureUserExists({
    from,
    userService,
    telegramConfig,
    ctx,
  });

  if (user.is_baned) {
    const text = isBanedText();
    await ctx.replyWithHTML(text);
    return;
  }

  try {
    await next();
  } catch (error) {
    await onUseCatchError({ ctx, group_id: error_group_id, error });
  }
};
