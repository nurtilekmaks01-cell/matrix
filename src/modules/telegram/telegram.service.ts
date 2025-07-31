import { Injectable } from '@nestjs/common';
import { Action, Ctx, Hears, Next, Start, Update, Use } from 'nestjs-telegraf';
import { TelegramConfig } from 'src/helpers/config/services/telegram.config';
import { Telegraf } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { onUseAction } from './actions/use';
import { onStartAction } from './actions/start';
import { START_ACTIONS } from './actions/start/constants/action.constant';
import { replenishAction } from './actions/start/actions/replenish.action';
import { UserService } from '../user/user.service';
import { replenishRequestAction } from './actions/replenish';
import { ReplenishService } from '../replenish/replenish.service';
import {
  REPLENISH_REQUEST_STATUS_CALLBACK,
  REPLENISH_REQUEST_STATUS_CALLBACK_CONFIRM,
} from './scenes/replenish/actions/status.action';
import { confirmReplenishRequestAction } from './actions/replenish/confirm.replenish';
import { clearInlineKeyboard } from './actions/inline-keyboard/clear-inline-keyboard';
import {
  WITHDRAW_REQUEST_STATUS_CALLBACK,
  WITHDRAW_REQUEST_STATUS_CALLBACK_CONFIRM,
} from './scenes/withdraw/actions/status.action';
import { withdrawRequestAction } from './actions/withdraw';
import { WithdrawService } from '../withdraw/withdraw.service';
import { confirmWithdrawRequestAction } from './actions/withdraw/confirm.withdraw';
import { FaqService } from 'src/helpers/faq/faq.service';
import { TELEGRAM_ACTION_KEYBOARDS } from './actions/keyboard';
import { AxiosService } from 'src/helpers/axios/axios.service';

@Injectable()
@Update()
export class TelegramService extends Telegraf<SceneContext> {
  constructor(
    private readonly telegramConfig: TelegramConfig,
    private readonly userService: UserService,
    private readonly replenishService: ReplenishService,
    private readonly withdrawService: WithdrawService,
    private readonly faqService: FaqService,
    private readonly axiosService: AxiosService,
  ) {
    super(telegramConfig.bot_token);
  }

  @Use()
  async onUse(@Ctx() ctx: SceneContext, @Next() next: () => Promise<void>) {
    await onUseAction({
      ctx,
      next,
      telegramConfig: this.telegramConfig,
      userService: this.userService,
    });
  }

  @Start()
  async onStart(@Ctx() ctx: SceneContext) {
    await onStartAction({ ctx, faqService: this.faqService });
  }

  @Hears(Object.values(TELEGRAM_ACTION_KEYBOARDS))
  async onCancel(@Ctx() ctx: SceneContext) {
    await onStartAction({ ctx, faqService: this.faqService });
  }

  @Action(Object.values(TELEGRAM_ACTION_KEYBOARDS))
  async onCalcelAction(@Ctx() ctx: SceneContext) {
    await onStartAction({ ctx, faqService: this.faqService });
  }

  @Action(Object.values(START_ACTIONS))
  async onReplenishAction(@Ctx() ctx: SceneContext) {
    await replenishAction({ ctx });
    await clearInlineKeyboard({ ctx });
  }

  @Action(Object.values(REPLENISH_REQUEST_STATUS_CALLBACK))
  async onApiAction(@Ctx() ctx: SceneContext) {
    await replenishRequestAction({
      ctx,
      replenishService: this.replenishService,
    });
  }

  @Action(Object.values(REPLENISH_REQUEST_STATUS_CALLBACK_CONFIRM))
  async onConfirmReplenishAction(@Ctx() ctx: SceneContext) {
    await confirmReplenishRequestAction({
      ctx,
      replenishService: this.replenishService,
      userService: this.userService,
      axiosService: this.axiosService,
    });
  }

  @Action(Object.values(WITHDRAW_REQUEST_STATUS_CALLBACK))
  async onWithdrawAction(@Ctx() ctx: SceneContext) {
    await withdrawRequestAction({ ctx, withdrawService: this.withdrawService });
  }

  @Action(Object.values(WITHDRAW_REQUEST_STATUS_CALLBACK_CONFIRM))
  async onWithdrawConfirm(@Ctx() ctx: SceneContext) {
    await confirmWithdrawRequestAction({
      ctx,
      userService: this.userService,
      withdrawService: this.withdrawService,
    });
  }
}
