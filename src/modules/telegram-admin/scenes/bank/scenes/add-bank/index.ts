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
import { EBankSceneActions } from '../../types';
import { addBankSceneEnter } from './scene-enter';
import { SceneContext } from 'telegraf/typings/scenes';
import { adminOnStart } from 'src/modules/telegram-admin/actions/start';
import { leaveScene } from 'src/modules/telegram/scenes';
import { TELEGRAM_ACTION_KEYBOARDS } from 'src/modules/telegram/actions/keyboard';
import { onMessageAddBank } from './messages';
import { PhotoSize } from 'telegraf/typings/core/types/typegram';
import { onMessagePhoto } from './messages/photo';
import { QrcodeService } from 'src/helpers/qrcode/qrcode.service';
import { AxiosFileService } from 'src/helpers/axios/services/file.service';
import { BankService } from 'src/modules/bank/bank.service';

@Injectable()
@Scene(EBankSceneActions.ADD_BANK)
export class AdminTelegramAddBankScene {
  constructor(
    private readonly qrcodeService: QrcodeService,
    private readonly axiosFileService: AxiosFileService,
    private readonly bankService: BankService,
  ) {}

  @Start()
  async onStart(@Ctx() ctx: SceneContext) {
    await adminOnStart({ ctx });
    await leaveScene({ ctx });
  }

  @Action(Object.values(TELEGRAM_ACTION_KEYBOARDS))
  async onActionKeyboard(@Ctx() ctx: SceneContext) {
    await adminOnStart({ ctx });
    await leaveScene({ ctx });
  }

  @Hears(Object.values(TELEGRAM_ACTION_KEYBOARDS))
  async onHearKeyboard(@Ctx() ctx: SceneContext) {
    await adminOnStart({ ctx });
    await leaveScene({ ctx });
  }

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: SceneContext) {
    await addBankSceneEnter({ ctx });
  }

  @On('text')
  async onText(@Ctx() ctx: SceneContext, @Message('text') text: string) {
    await onMessageAddBank({ ctx, text });
  }

  @On('photo')
  async onPhoto(
    @Ctx() ctx: SceneContext,
    @Message('photo') photo: PhotoSize[],
  ) {
    await onMessagePhoto({
      ctx,
      photo,
      qrcodeService: this.qrcodeService,
      axiosFileService: this.axiosFileService,
      bankService: this.bankService,
    });
  }
}
