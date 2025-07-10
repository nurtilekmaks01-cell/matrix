import { Module } from '@nestjs/common';
import { TelegramAdminService } from './telegram-admin.service';
import { ConfigModule } from 'src/helpers/config/config.module';
import { AdminTelegramBankScene } from './scenes/bank';
import { AdminTelegramFaqScene } from './scenes/faq';
import { FaqModule } from 'src/helpers/faq/faq.module';
import { AdminTelegramEditFaqScene } from './scenes/faq/scenes/edit-faq';
import { AdminTelegramAddFaqScene } from './scenes/faq/scenes/add-faq';
import { AdminTelegramEditBankScene } from './scenes/bank/scenes/edit-bank';
import { AdminTelegramAddBankScene } from './scenes/bank/scenes/add-bank';
import { QrcodeModule } from 'src/helpers/qrcode/qrcode.module';
import { AxiosModule } from 'src/helpers/axios/axios.module';
import { BankModule } from '../bank/bank.module';

@Module({
  imports: [ConfigModule, FaqModule, QrcodeModule, AxiosModule, BankModule],
  controllers: [],
  providers: [
    TelegramAdminService,
    AdminTelegramBankScene,
    AdminTelegramFaqScene,
    AdminTelegramEditFaqScene,
    AdminTelegramAddFaqScene,
    AdminTelegramEditBankScene,
    AdminTelegramAddBankScene,
  ],
  exports: [TelegramAdminService],
})
export class TelegramAdminModule {}
