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
import { EFaqSceneActions } from '../../types';
import { addFaqSceneEnter } from './scene-enter';
import { SceneContext } from 'telegraf/typings/scenes';
import { adminOnStart } from 'src/modules/telegram-admin/actions/start';
import { leaveScene } from 'src/modules/telegram/scenes';
import { TELEGRAM_ACTION_KEYBOARDS } from 'src/modules/telegram/actions/keyboard';
import { addFaqMessage } from './message';
import { addFaqActions } from './actions';
import { saveFaqAction } from './actions/save-faq';
import { FaqService } from 'src/helpers/faq/faq.service';
import { clearInlineKeyboard } from 'src/modules/telegram/actions/inline-keyboard/clear-inline-keyboard';

@Scene(EFaqSceneActions.ADD_FAQ)
export class AdminTelegramAddFaqScene {
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
    await addFaqSceneEnter({ ctx });
  }

  @On('text')
  async onText(@Ctx() ctx: SceneContext, @Message('text') text: string) {
    await addFaqMessage({ ctx, text });
  }

  @Action(addFaqActions.SAVE)
  async onAddFaq(@Ctx() ctx: SceneContext) {
    await saveFaqAction({ ctx, faqService: this.faqService });
    await clearInlineKeyboard({ ctx });
  }
}
