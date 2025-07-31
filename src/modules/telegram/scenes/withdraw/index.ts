import { Injectable } from '@nestjs/common';
import {
  Action,
  Ctx,
  Hears,
  Message,
  On,
  Scene,
  SceneEnter,
  Start,
} from 'nestjs-telegraf';
import { leaveScene, TelegramScenes } from '..';
import { withdrawSceneEnter } from './actions/scene-enter';
import { SceneContext } from 'telegraf/typings/scenes';
import { EBanks } from 'src/modules/bank/shared/types';
import { withdrawBankAction } from './actions/bank';
import { withdrawMessage } from './message';
import { clearInlineKeyboard } from '../../actions/inline-keyboard/clear-inline-keyboard';
import { withdrawQrcode } from './message/photo';
import { PhotoSize } from 'telegraf/typings/core/types/typegram';
import { onStartAction } from '../../actions/start';
import { WithdrawService } from 'src/modules/withdraw/withdraw.service';
import { TelegramConfig } from 'src/helpers/config/services/telegram.config';
import { FaqService } from 'src/helpers/faq/faq.service';
import { TELEGRAM_ACTION_KEYBOARDS } from '../../actions/keyboard';
import { KeyupService } from 'src/helpers/keyup/keyup.service';
import { AxiosService } from 'src/helpers/axios/axios.service';

@Injectable()
@Scene(TelegramScenes.WITHDRAW)
export class WithdrawScene {
  constructor(
    private readonly withdrawService: WithdrawService,
    private readonly telegramConfig: TelegramConfig,
    private readonly faqService: FaqService,
    private readonly keyupService: KeyupService,
    private readonly axiosService: AxiosService,
  ) {}

  @Start()
  async onStart(@Ctx() ctx: SceneContext) {
    await onStartAction({ ctx, faqService: this.faqService });
    await leaveScene({ ctx });
  }

  @Hears(Object.values(TELEGRAM_ACTION_KEYBOARDS))
  async onCancel(@Ctx() ctx: SceneContext) {
    await onStartAction({ ctx, faqService: this.faqService });
    await leaveScene({ ctx });
  }

  @Action(Object.values(TELEGRAM_ACTION_KEYBOARDS))
  async onCalcelAction(@Ctx() ctx: SceneContext) {
    await onStartAction({ ctx, faqService: this.faqService });
    await leaveScene({ ctx });
  }

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: SceneContext) {
    await withdrawSceneEnter({ ctx });
  }

  @Action(Object.values(EBanks))
  async onBankAction(@Ctx() ctx: SceneContext) {
    await withdrawBankAction({ ctx, keyupService: this.keyupService });
    await clearInlineKeyboard({ ctx });
  }

  @On('text')
  async onText(@Ctx() ctx: SceneContext, @Message('text') text: string) {
    await withdrawMessage({
      ctx,
      text,
      withdrawService: this.withdrawService,
      telegramConfig: this.telegramConfig,
      faqService: this.faqService,
      keyupService: this.keyupService,
      axiosService: this.axiosService,
    });
  }

  @On('photo')
  async onPhoto(
    @Ctx() ctx: SceneContext,
    @Message('photo') photo: PhotoSize[],
  ) {
    await withdrawQrcode({ ctx, photo });
  }
}
