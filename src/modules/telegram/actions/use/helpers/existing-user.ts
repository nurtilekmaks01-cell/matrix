import { TelegramConfig } from 'src/helpers/config/services/telegram.config';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UserService } from 'src/modules/user/user.service';
import { User } from 'telegraf/typings/core/types/typegram';
import { SceneContext } from 'telegraf/typings/scenes';

interface IExistingUserArgs {
  userService: UserService;
  from: User;
  telegramConfig: TelegramConfig;
  ctx: SceneContext;
}
export const ensureUserExists = async (args: IExistingUserArgs) => {
  const { userService, from, telegramConfig, ctx } = args;

  const telegram_id = String(from.id);
  const user_group_id = telegramConfig.user_chat_id;

  let user = await userService.findOneWithOptions({ where: { telegram_id } });

  if (!user) {
    const createUserDto: CreateUserDto = {
      telegram_id,
      first_name: from.first_name,
      last_name: from.last_name,
      username: from.username,
    };

    user = await userService.create(createUserDto);
    await ctx.telegram.sendMessage(
      user_group_id,
      `Новый пользователь: ${user.first_name} (@${user.username})\nuser_id:${user.id}\ntelegram_id:${user.telegram_id}`,
    );
  }

  const action_count = user.action_count || 0;
  await userService.update(user.id, {
    action_count: action_count + 1,
  });

  return user;
};
