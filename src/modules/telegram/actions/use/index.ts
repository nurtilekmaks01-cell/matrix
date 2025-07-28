import { TelegramConfig } from 'src/helpers/config/services/telegram.config';
import { SceneContext } from 'telegraf/typings/scenes';
import { onUseCatchError } from './helpers/catch-error';
import { UserService } from 'src/modules/user/user.service';
import { ensureUserExists } from './helpers/existing-user';
import { User } from 'telegraf/typings/core/types/typegram';
import { isBanedText } from './helpers/is-baned';

interface IOnUseActionArgs {
  ctx: SceneContext;
  next: () => Promise<void>;
  telegramConfig: TelegramConfig;
  userService: UserService;
}
export const onUseAction = async (args: IOnUseActionArgs) => {
  const { ctx, next, telegramConfig, userService } = args;
  const chat = ctx.chat;
  const from = ctx.from as User;

  const error_group_id = telegramConfig.error_chat_id;

  console.log(chat, 'chat');

  const user = await ensureUserExists({
    from,
    userService,
    telegramConfig,
    ctx,
  });

  console.log(user, 'user');

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
