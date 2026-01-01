import { EBookmakers } from './telegram';

export interface ITelegramDefaultSession {
  is_main: boolean;
  replenish_chat_id: string;
  withdraw_chat_id: string;
  bet: {
    type: EBookmakers;
    assets: {
      id: string;
    };
    price: {
      min: number;
      max: number;
    };
    choose_action_message_id?: number;
  };
}
