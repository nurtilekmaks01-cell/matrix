import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // You can add additional properties here if needed
  // For example, if you want to allow updating the action count:
  action_count?: number | null; // Optional property for action count
}
