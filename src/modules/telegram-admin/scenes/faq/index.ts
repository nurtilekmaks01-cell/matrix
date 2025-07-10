import { Injectable } from '@nestjs/common';
import { Action, Ctx, Hears, Scene, SceneEnter, Start } from 'nestjs-telegraf';
import { ETelegramAdminActions } from '../../actions/start/helpers/actions';
import { adminOnStart } from '../../actions/start';
import { SceneContext } from 'telegraf/typings/scenes';
import { leaveScene } from 'src/modules/telegram/scenes';
import { TELEGRAM_ACTION_KEYBOARDS } from 'src/modules/telegram/actions/keyboard';
import { adminFaqSceneEnter } from './scene-enter';
import { EFaqSceneActions } from './types';
import { faqAction } from './actions/faq-action';

@Injectable()
@Scene(ETelegramAdminActions.FAQ)
export class AdminTelegramFaqScene {
  constructor() {}

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
  async onFaqSceneEnter(@Ctx() ctx: SceneContext) {
    await adminFaqSceneEnter({ ctx });
  }

  @Action(Object.values(EFaqSceneActions))
  async onFaqAction(@Ctx() ctx: SceneContext) {
    await faqAction({ ctx });
  }
}
