import { PartialType } from '@nestjs/mapped-types';
import { CreateWithdrawDto } from './create-withdraw.dto';
import { ERequest } from 'src/shared/types/request';

export class UpdateWithdrawDto extends PartialType(CreateWithdrawDto) {
  status?: ERequest;
}
