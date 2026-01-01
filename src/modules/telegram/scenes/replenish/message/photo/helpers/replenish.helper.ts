import { CreateReplenishDto } from 'src/modules/replenish/dto/create-replenish.dto';
import { ReplenishService } from 'src/modules/replenish/replenish.service';
import { IReplenishSession } from '../../../session';

interface IReplenishArgs {
  replenishService: ReplenishService;
  message_id: string;
  session: IReplenishSession;
  telegram_id: string;
}
export const createReplenish = async (args: IReplenishArgs) => {
  const { message_id, replenishService, session, telegram_id } = args;

  const replenishCreateDto: CreateReplenishDto = {
    bet_id: session.bet_id as string,
    message_id,
    price: session.price as string,
    telegram_id,
    name: session.name as string,
    bookmaker: session.bet.type,
  };

  const replenish = await replenishService.create(replenishCreateDto);

  return replenish;
};

interface IUpdateReplenishArgs {
  message_id: string;
  replenishService: ReplenishService;
  replenish_id: number;
}
export const updateReplenish = async (args: IUpdateReplenishArgs) => {
  const { message_id, replenishService, replenish_id } = args;

  await replenishService.update(replenish_id, { message_id });
};
