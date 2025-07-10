import { Module } from '@nestjs/common';
import { KeyupService } from './keyup.service';
import { KeyupController } from './keyup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Keyup } from './entities/keyup.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Keyup, User])],
  controllers: [KeyupController],
  providers: [KeyupService],
  exports: [KeyupService],
})
export class KeyupModule {}
