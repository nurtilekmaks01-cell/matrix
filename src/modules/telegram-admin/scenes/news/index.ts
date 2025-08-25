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
import { ETelegramAdminActions } from '../../actions/start/helpers/actions';
import { adminOnStart } from '../../actions/start';
import { leaveScene } from 'src/modules/telegram/scenes';
import { SceneContext } from 'telegraf/typings/scenes';
import { TELEGRAM_ACTION_KEYBOARDS } from 'src/modules/telegram/actions/keyboard';
import { adminNewsSceneEnter } from './scene-enter';
import { newsTextMessage } from './messages/text';
import { newsPhotoMessage } from './messages/photo';
import { PhotoSize } from 'telegraf/typings/core/types/typegram';
import { ETelegramAdminNewsActions } from './actions';
import { newsSendActions } from './actions/send';
import { AutoReplyService } from 'src/helpers/auto-reply/auto-reply.service';
import { clearInlineKeyboard } from 'src/modules/telegram/actions/inline-keyboard/clear-inline-keyboard';

@Injectable()
@Scene(ETelegramAdminActions.NEWS)
export class AdminTelegramNewsScene {
  constructor(private readonly autoReplyService: AutoReplyService) {}

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
  async onNewsSceneEnter(@Ctx() ctx: SceneContext) {
    await adminNewsSceneEnter({ ctx });
  }

  @On('text')
  async onText(@Ctx() ctx: SceneContext, @Message('text') text: string) {
    await newsTextMessage({ ctx, text });
  }

  @On('photo')
  async onPhoto(
    @Ctx() ctx: SceneContext,
    @Message('photo') photo: PhotoSize[],
  ) {
    await newsPhotoMessage({ ctx, photo });
  }

  @Action(ETelegramAdminNewsActions.SEND)
  async onNewsAction(@Ctx() ctx: SceneContext) {
    await newsSendActions({ ctx, autoReplyService: this.autoReplyService });
    await clearInlineKeyboard({ ctx });
  }
}
