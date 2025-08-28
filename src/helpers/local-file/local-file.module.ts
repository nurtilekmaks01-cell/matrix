import { Module } from '@nestjs/common';
import { LocalFileService } from './local-file.service';
import { FileFaqService } from './services/faq.service';
import { FileBankService } from './services/bank.service';
import { FileTelegramService } from './services/telegram.service';

@Module({
  controllers: [],
  providers: [
    LocalFileService,
    FileFaqService,
    FileBankService,
    FileTelegramService,
  ],
  exports: [
    LocalFileService,
    FileFaqService,
    FileBankService,
    FileTelegramService,
  ],
})
export class LocalFileModule {}
