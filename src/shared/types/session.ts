export interface ITelegramDefaultSession {
  replenish_chat_id: string;
  withdraw_chat_id: string;
  bet: {
    assets: {
      id: string;
    };
  };
}
