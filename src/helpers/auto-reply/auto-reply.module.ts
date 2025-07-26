import { Module } from '@nestjs/common';
import { AutoReplyService } from './auto-reply.service';
import { AutoReplyController } from './auto-reply.controller';
import { UserModule } from 'src/modules/user/user.module';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [UserModule, ConfigModule],
  controllers: [AutoReplyController],
  providers: [AutoReplyService],
  exports: [AutoReplyService],
})
export class AutoReplyModule {}
