import { EBanks } from '../shared/types';

export class CreateBankDto {
  name: string;
  qrcode_link: string;
  link_hash: string;
  href: string;
  type: EBanks;
  phone_number?: string;
}
