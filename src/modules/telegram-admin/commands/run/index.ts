import { FileTelegramService } from 'src/helpers/local-file/services/telegram.service';
import { SceneContext } from 'telegraf/typings/scenes';

interface ITelegramRunCommandArgs {
  ctx: SceneContext;
  fileTelegramService: FileTelegramService;
}
export const telegramRunCommand = async (args: ITelegramRunCommandArgs) => {
  const { ctx, fileTelegramService } = args;

  await fileTelegramService.writeTelegramJsonFile({ bot_starting: true });

  await ctx.reply('Вы запустили бота. Чтобы остановить его, нажмите /stop.');
};
