import { Injectable } from '@nestjs/common';
import { Action, Ctx, Hears, Scene, SceneEnter, Start } from 'nestjs-telegraf';
import { EBankSceneActions } from '../../types';
import { adminOnStart } from 'src/modules/telegram-admin/actions/start';
import { leaveScene } from 'src/modules/telegram/scenes';
import { SceneContext } from 'telegraf/typings/scenes';
import { TELEGRAM_ACTION_KEYBOARDS } from 'src/modules/telegram/actions/keyboard';
import { editBankSceneEnter } from './scene-enter';
import { BankService } from 'src/modules/bank/bank.service';
import { editBankACtion } from './actions/edit-bank';

@Injectable()
@Scene(EBankSceneActions.EDIT_BANK)
export class AdminTelegramEditBankScene {
  constructor(private readonly bankService: BankService) {}

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
    await editBankSceneEnter({ ctx, bankService: this.bankService });
  }

  @Action(/edit_(.+)/)
  async onAction(@Ctx() ctx: SceneContext) {
    await editBankACtion({ ctx, bankService: this.bankService });
  }
}
