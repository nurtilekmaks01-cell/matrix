import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  telegram_id: string;
  @ApiProperty()
  first_name?: string;
  @ApiProperty()
  last_name?: string;
  @ApiProperty()
  username?: string;
}
