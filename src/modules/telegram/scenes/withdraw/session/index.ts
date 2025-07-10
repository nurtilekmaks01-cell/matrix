import { EBanks } from 'src/modules/bank/shared/types';
import { ITelegramDefaultSession } from 'src/shared/types/session';

export interface IWithdrawSession extends ITelegramDefaultSession {
  bank?: EBanks;
  phone_number?: string;
  name?: string;
  bet_id?: string;
  secret_code?: string;
  is_qrcode?: boolean;
  qrcode_file_id?: string;
}

export const clearWithdrawSession = (session: IWithdrawSession) => {
  session.bank = undefined;
  session.phone_number = undefined;
  session.bet_id = undefined;
  session.secret_code = undefined;
  session.is_qrcode = undefined;
  session.qrcode_file_id = undefined;
  session.name = undefined;
};
