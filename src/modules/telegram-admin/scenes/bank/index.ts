import { Injectable } from '@nestjs/common';
import { Action, Ctx, Hears, Scene, SceneEnter, Start } from 'nestjs-telegraf';
import { ETelegramAdminActions } from '../../actions/start/helpers/actions';
import { adminOnStart } from '../../actions/start';
import { TELEGRAM_ACTION_KEYBOARDS } from 'src/modules/telegram/actions/keyboard';
import { SceneContext } from 'telegraf/typings/scenes';
import { leaveScene } from 'src/modules/telegram/scenes';
import { adminBankSceneEnter } from './scene-enter';
import { EBankSceneActions } from './types';
import { bankSceneAction } from './actions/bank-scene-action';
import { clearInlineKeyboard } from 'src/modules/telegram/actions/inline-keyboard/clear-inline-keyboard';

@Injectable()
@Scene(ETelegramAdminActions.BANK)
export class AdminTelegramBankScene {
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
  async onSceneEnter(@Ctx() ctx: SceneContext) {
    await adminBankSceneEnter({ ctx });
  }

  @Action(Object.values(EBankSceneActions))
  async onBankSceneAction(@Ctx() ctx: SceneContext) {
    await bankSceneAction({ ctx });
    await clearInlineKeyboard({ ctx });
  }
}
