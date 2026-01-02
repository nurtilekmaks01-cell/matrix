import { SceneContext } from 'telegraf/typings/scenes';
import { IReplenishSession } from '../../session';
import { KeyupService } from 'src/helpers/keyup/keyup.service';
import { CreateKeyupDto } from 'src/helpers/keyup/dto/create-keyup.dto';
import { EKeyupTypeAction } from 'src/helpers/keyup/shared/type';
import { KeyboardButton } from 'telegraf/typings/core/types/typegram';
import { TELEGRAM_ACTION_KEYBOARDS } from 'src/modules/telegram/actions/keyboard';
import { AxiosService } from 'src/helpers/axios/axios.service';
import { EBookmakers } from 'src/shared/types/telegram';

interface IGenerateTextArgs {
  price: {
    min: number;
    max: number;
  };
}
const generateText = (args: IGenerateTextArgs) => {
  const { price } = args;

  const text = `
🎯 <b>Укажите сумму пополнения</b>

Сколько вы хотите внести на счет?

📊 Диапазон: от <b>${price.min}</b> до <b>${price.max}</b>
  `;

  return text.trim();
};

const generateKeyboard = () => {
  const keyboard: KeyboardButton[][] = [];

  // keyboard.push([{ text: '500' }, { text: '700' }]);
  // keyboard.push([{ text: '1000' }, { text: '3000' }, { text: '5000' }]);

  keyboard.push([{ text: TELEGRAM_ACTION_KEYBOARDS.CANCELED }]);

  return keyboard;
};

interface IKeyupCreateArgs {
  keyupService: KeyupService;
  value: string;
  telegram_id: string;
}
const createKeyup = async (args: IKeyupCreateArgs) => {
  const { keyupService, value, telegram_id } = args;

  const createKeyupDto: CreateKeyupDto = {
    telegram_id,
    value,
    type: EKeyupTypeAction.BOOKMAKER,
  };

  await keyupService.create(createKeyupDto);
};

interface IBetIdArgs {
  ctx: SceneContext;
  text: string;
  session: IReplenishSession;
  keyupService: KeyupService;
  telegram_id: string;
  axiosService: AxiosService;
}
export const replenishMessageBetId = async (args: IBetIdArgs) => {
  const { ctx, session, text, keyupService, telegram_id, axiosService } = args;

  // if (session.bet.type === EBookmakers.MELBET) {
  //   const findPlayer = await axiosService.getMelbetUserInfo(text);

  //   console.log(findPlayer, 'find player');

  //   if (!findPlayer?.UserId) {
  //     await ctx.reply(
  //       'Игрок не найден. Пожалуйста, проверьте ID и попробуйте снова.',
  //     );
  //     return;
  //   }

  //   if (findPlayer.CurrencyId !== 7) {
  //     await ctx.reply(
  //       '❌ Неверная валюта. Операция доступна только для игроков с валютой KGS (сом).',
  //     );
  //     return;
  //   }
  // }

  session.bet_id = text;

  const replyText = generateText({ price: session.bet.price });

  await createKeyup({ keyupService, telegram_id, value: text });

  const keyboard = generateKeyboard();

  await ctx.replyWithHTML(replyText, {
    reply_markup: { keyboard, resize_keyboard: true },
  });
};
