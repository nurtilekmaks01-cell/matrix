import { EBookmakers } from 'src/shared/types/telegram';

export class CreateReplenishDto {
  message_id: string;
  bet_id: string;
  price: string;
  telegram_id: string;
  name: string;
  bookmaker: EBookmakers;
}
