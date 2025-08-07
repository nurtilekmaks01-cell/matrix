import { ReplenishService } from 'src/modules/replenish/replenish.service';
import { UserService } from 'src/modules/user/user.service';
import { SceneContext } from 'telegraf/typings/scenes';

interface IBanArgs {
  ctx: SceneContext;
  replenishService: ReplenishService;
  usersService: UserService;
}
export const replenishBanCommand = async (args: IBanArgs) => {
  const { ctx, replenishService, usersService } = args;

  const update = ctx.update;

  if ('message' in update) {
    const message = update.message;

    if ('reply_to_message' in message) {
      const reply_to_message = message.reply_to_message;

      const message_id = String(reply_to_message?.message_id);

      const replenish = await replenishService.findOneWithOptions({
        where: { message_id },
        relations: ['user'],
      });

      const user_id = String(replenish?.user.telegram_id);

      await usersService.updateBaned({ telegram_id: user_id, status: true });

      await ctx.reply(`Пользователь с ID ${user_id} успешно забанен`);
    }
  }
};
