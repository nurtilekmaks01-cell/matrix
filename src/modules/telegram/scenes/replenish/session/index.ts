import { ITelegramDefaultSession } from 'src/shared/types/session';

export interface IReplenishSession extends ITelegramDefaultSession {
  name?: string;
  bet_id?: string;
  price?: string;
  photo?: string;
  bookmaker_message_id?: string;
}

export const clearReplenishSession = (session: IReplenishSession) => {
  session.name = undefined;
  session.bet_id = undefined;
  session.price = undefined;
  session.photo = undefined;
};
