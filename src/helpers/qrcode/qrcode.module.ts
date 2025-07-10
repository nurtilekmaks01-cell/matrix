import { Module } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';

@Module({
  imports: [],
  controllers: [],
  providers: [QrcodeService],
  exports: [QrcodeService],
})
export class QrcodeModule {}
