import { Module } from '@nestjs/common';
import { AxiosService } from './axios.service';
import { HttpModule } from '@nestjs/axios';
import { AxiosFileService } from './services/file.service';
import { XBetService } from './services/xbet.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [],
  providers: [AxiosService, AxiosFileService, XBetService],
  exports: [AxiosService, AxiosFileService, XBetService],
})
export class AxiosModule {}
