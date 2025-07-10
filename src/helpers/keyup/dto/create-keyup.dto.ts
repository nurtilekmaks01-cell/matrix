import { EKeyupTypeAction } from '../shared/type';

export class CreateKeyupDto {
  type: EKeyupTypeAction;

  value: string;

  telegram_id: string;
}
