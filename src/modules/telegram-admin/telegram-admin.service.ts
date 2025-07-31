import { Injectable } from '@nestjs/common';
import {
  Action,
  Command,
  Ctx,
  Hears,
  Next,
  Start,
  Update,
  Use,
} from 'nestjs-telegraf';
import { TelegramConfig } from 'src/helpers/config/services/telegram.config';
import { Telegraf } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { adminOnUse } from './actions/use';
import { adminOnStart } from './actions/start';
import { TELEGRAM_ACTION_KEYBOARDS } from '../telegram/actions/keyboard';
import { ETelegramAdminActions } from './actions/start/helpers/actions';
import { adminTelegramActions } from './actions/main-actions';
import { clearInlineKeyboard } from '../telegram/actions/inline-keyboard/clear-inline-keyboard';
import { AxiosService } from 'src/helpers/axios/axios.service';
import { getBalance } from './actions/get-balance';

@Injectable()
@Update()
export class TelegramAdminService extends Telegraf<SceneContext> {
  constructor(
    private readonly telegramConfig: TelegramConfig,
    private readonly axiosService: AxiosService,
  ) {
    super(telegramConfig.admin_bot_token);
  }

  @Use()
  async onUse(@Ctx() ctx: SceneContext, @Next() next: () => Promise<void>) {
    await adminOnUse({ ctx, next, telegramConfig: this.telegramConfig });
  }

  @Start()
  async onStart(@Ctx() ctx: SceneContext) {
    await adminOnStart({ ctx });
  }

  @Action(Object.values(TELEGRAM_ACTION_KEYBOARDS))
  async onActionKeyboard(@Ctx() ctx: SceneContext) {
    await adminOnStart({ ctx });
    await clearInlineKeyboard({ ctx });
  }

  @Hears(Object.values(TELEGRAM_ACTION_KEYBOARDS))
  async onHearKeyboard(@Ctx() ctx: SceneContext) {
    await adminOnStart({ ctx });
  }

  @Action(Object.values(ETelegramAdminActions))
  async onAdminTelegramActions(@Ctx() ctx: SceneContext) {
    await adminTelegramActions({ ctx });
    await clearInlineKeyboard({ ctx });
  }

  @Command('balance')
  async onBalanceCommand(@Ctx() ctx: SceneContext) {
    await getBalance({ ctx, axiosService: this.axiosService });
  }
}
