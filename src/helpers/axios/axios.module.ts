import { Module } from '@nestjs/common';
import { AxiosService } from './axios.service';
import { HttpModule } from '@nestjs/axios';
import { AxiosFileService } from './services/file.service';
import { XBetService } from './services/xbet.service';
import { ConfigModule } from '../config/config.module';
import { MelbetService } from './services/melbet.service';
import { OneWinService } from './services/win.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [],
  providers: [
    AxiosService,
    AxiosFileService,
    XBetService,
    MelbetService,
    OneWinService,
  ],
  exports: [AxiosService, AxiosFileService, XBetService, OneWinService],
})
export class AxiosModule {}
