import { PartialType } from '@nestjs/mapped-types';
import { CreateReplenishDto } from './create-replenish.dto';
import { ERequest } from 'src/shared/types/request';

export class UpdateReplenishDto extends PartialType(CreateReplenishDto) {
  status?: ERequest;
}
