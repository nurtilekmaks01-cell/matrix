import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import * as NestConfig from '@nestjs/config';
import { TelegramConfig } from './services/telegram.config';
import { AppConfig } from './services/app.config';
import { DBConfig } from './services/db.config';
import { XbetConfig } from './services/xbet.config';

@Module({
  imports: [
    NestConfig.ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [ConfigService, TelegramConfig, AppConfig, DBConfig, XbetConfig],
  exports: [ConfigService, TelegramConfig, AppConfig, DBConfig, XbetConfig],
})
export class ConfigModule {}
