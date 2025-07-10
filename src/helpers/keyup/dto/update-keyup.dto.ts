import { PartialType } from '@nestjs/mapped-types';
import { CreateKeyupDto } from './create-keyup.dto';

export class UpdateKeyupDto extends PartialType(CreateKeyupDto) {}
