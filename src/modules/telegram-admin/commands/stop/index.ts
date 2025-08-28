import { FileTelegramService } from 'src/helpers/local-file/services/telegram.service';
import { SceneContext } from 'telegraf/typings/scenes';

interface StopCommandContext {
  ctx: SceneContext;
  fileTelegramService: FileTelegramService;
}
export const telegramStopCommand = async (args: StopCommandContext) => {
  const { ctx, fileTelegramService } = args;

  await fileTelegramService.writeTelegramJsonFile({ bot_starting: false });

  await ctx.reply(
    'Вы остановили бота. Чтобы запустить его снова, нажмите /run.',
  );
};
