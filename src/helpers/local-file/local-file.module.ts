import { Module } from '@nestjs/common';
import { LocalFileService } from './local-file.service';
import { FileFaqService } from './services/faq.service';
import { FileBankService } from './services/bank.service';

@Module({
  controllers: [],
  providers: [LocalFileService, FileFaqService, FileBankService],
  exports: [LocalFileService, FileFaqService, FileBankService],
})
export class LocalFileModule {}
