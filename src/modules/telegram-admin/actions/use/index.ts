import { TelegramConfig } from 'src/helpers/config/services/telegram.config';
import { onUseCatchError } from 'src/modules/telegram/actions/use/helpers/catch-error';
import { SceneContext } from 'telegraf/typings/scenes';

interface IAdminUseArgs {
  ctx: SceneContext;
  next: () => Promise<void>;
  telegramConfig: TelegramConfig;
}
export const adminOnUse = async (args: IAdminUseArgs) => {
  const { ctx, next, telegramConfig } = args;

  const from = ctx.from;

  console.log(from);

  const error_group_id = telegramConfig.error_chat_id;

  const access_ids = [5464559350, 8171068456];

  if (!access_ids.includes(from?.id as number)) return;

  try {
    await next();
  } catch (error) {
    await onUseCatchError({ ctx, group_id: error_group_id, error });
  }
};
