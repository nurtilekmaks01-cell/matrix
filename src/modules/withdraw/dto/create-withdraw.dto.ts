import { EBanks } from 'src/modules/bank/shared/types';

export class CreateWithdrawDto {
  bet_id: string;
  bank: EBanks;
  name: string;
  phone_number: string;
  secret_code: string;
  message_id: string;
  price?: string | null;

  telegram_id: string;
}
