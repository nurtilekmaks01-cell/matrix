import { Module } from '@nestjs/common';
import { AxiosService } from './axios.service';
import { HttpModule } from '@nestjs/axios';
import { AxiosFileService } from './services/file.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [AxiosService, AxiosFileService],
  exports: [AxiosService, AxiosFileService],
})
export class AxiosModule {}
