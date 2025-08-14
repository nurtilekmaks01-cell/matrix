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
import { SceneContext } from 'telegraf/typings/scenes';
import { replenishSceneEnter } from './actions/scene-enter.action';
import { onReplenishMessage } from './message';
import { replenishPhoto } from './message/photo';
import { PhotoSize } from 'telegraf/typings/core/types/typegram';
import { ReplenishService } from 'src/modules/replenish/replenish.service';
import { onStartAction } from '../../actions/start';
import { FaqService } from 'src/helpers/faq/faq.service';
import { TELEGRAM_ACTION_KEYBOARDS } from '../../actions/keyboard';
import { KeyupService } from 'src/helpers/keyup/keyup.service';
import { BankService } from 'src/modules/bank/bank.service';
import { QrcodeService } from 'src/helpers/qrcode/qrcode.service';
import { AxiosService } from 'src/helpers/axios/axios.service';
import { AxiosFileService } from 'src/helpers/axios/services/file.service';

@Injectable()
@Scene(TelegramScenes.REPLENISH)
export class ReplenishScene {
  constructor(
    private readonly replenishService: ReplenishService,
    private readonly faqService: FaqService,
    private readonly keyupService: KeyupService,
    private readonly bankService: BankService,
    private readonly qrcodeService: QrcodeService,
    private readonly axiosService: AxiosService,
    private readonly axiosFileService: AxiosFileService,
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
    await replenishSceneEnter({ ctx, keyupService: this.keyupService });
  }

  @On('text')
  async OnText(@Ctx() ctx: SceneContext, @Message('text') text: string) {
    await onReplenishMessage({
      ctx,
      text,
      keyupService: this.keyupService,
      bankService: this.bankService,
      qrcodeService: this.qrcodeService,
      axiosService: this.axiosService,
    });
  }

  @On('photo')
  async onPhoto(
    @Ctx() ctx: SceneContext,
    @Message('photo') photo: PhotoSize[],
  ) {
    await replenishPhoto({
      ctx,
      photo,
      replenishService: this.replenishService,
      faqService: this.faqService,
      qrcodeService: this.qrcodeService,
      axiosFileService: this.axiosFileService,
    });
  }
}
