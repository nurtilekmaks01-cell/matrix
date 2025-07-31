import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ConfigModule } from 'src/helpers/config/config.module';
import { ReplenishScene } from './scenes/replenish';
import { ReplenishModule } from '../replenish/replenish.module';
import { UserModule } from '../user/user.module';
import { WithdrawScene } from './scenes/withdraw';
import { WithdrawModule } from '../withdraw/withdraw.module';
import { FaqModule } from 'src/helpers/faq/faq.module';
import { KeyupModule } from 'src/helpers/keyup/keyup.module';
import { BankModule } from '../bank/bank.module';
import { QrcodeModule } from 'src/helpers/qrcode/qrcode.module';
import { AxiosModule } from 'src/helpers/axios/axios.module';

@Module({
  imports: [
    ConfigModule,
    ReplenishModule,
    UserModule,
    WithdrawModule,
    FaqModule,
    KeyupModule,
    BankModule,
    QrcodeModule,
    AxiosModule,
  ],
  controllers: [],
  providers: [TelegramService, ReplenishScene, WithdrawScene],
  exports: [TelegramService],
})
export class TelegramModule {}
