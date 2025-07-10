import { Action, Ctx, Hears, Scene, SceneEnter, Start } from 'nestjs-telegraf';
import { EFaqSceneActions } from '../../types';
import { FaqService } from 'src/helpers/faq/faq.service';
import { SceneContext } from 'telegraf/typings/scenes';
import { editFaqSceneEnter } from './scene-enter';
import { editFaqActions } from './actions/edit-faq';
import { adminOnStart } from 'src/modules/telegram-admin/actions/start';
import { leaveScene } from 'src/modules/telegram/scenes';
import { TELEGRAM_ACTION_KEYBOARDS } from 'src/modules/telegram/actions/keyboard';

@Scene(EFaqSceneActions.EDIT_FAQ)
export class AdminTelegramEditFaqScene {
  constructor(private readonly faqService: FaqService) {}

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
    await editFaqSceneEnter({ ctx, faqService: this.faqService });
  }

  @Action(/edit_(.+)/)
  async onFaqEdit(@Ctx() ctx: SceneContext) {
    await editFaqActions({ ctx, faqService: this.faqService });
  }
}
