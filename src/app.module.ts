import { Module } from '@nestjs/common';
import { ConfigModule } from './helpers/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfig } from './helpers/config/services/db.config';
import { session } from 'telegraf';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramConfig } from './helpers/config/services/telegram.config';
import { TelegramModule } from './modules/telegram/telegram.module';
import { ITelegramDefaultSession } from './shared/types/session';
import { ReplenishModule } from './modules/replenish/replenish.module';
import { WithdrawModule } from './modules/withdraw/withdraw.module';
import { UserModule } from './modules/user/user.module';
import { BankModule } from './modules/bank/bank.module';
import { assets } from './assets';
import { FaqModule } from './helpers/faq/faq.module';
import { KeyupModule } from './helpers/keyup/keyup.module';
import { TelegramAdminModule } from './modules/telegram-admin/telegram-admin.module';
import { LocalFileModule } from './helpers/local-file/local-file.module';
import { QrcodeModule } from './helpers/qrcode/qrcode.module';
import { AxiosModule } from './helpers/axios/axios.module';
import { AutoReplyModule } from './helpers/auto-reply/auto-reply.module';
import { MelbetConfig } from './helpers/config/services/melbet.config';
import { XbetConfig } from './helpers/config/services/xbet.config';
import { EBookmakers } from './shared/types/telegram';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [DBConfig],
      useFactory: (dbConfig: DBConfig) => ({
        type: 'postgres',
        host: dbConfig.db_host,
        port: dbConfig.db_port,
        username: dbConfig.db_username,
        password: dbConfig.db_password,
        database: dbConfig.db_database,
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
        extra: {
          options: '-c timezone=Asia/Almaty',
          // ssl: {
          //   rejectUnauthorized: false,
          // },
        },
        synchronize: true, // Set to false in production
        // ssl: true,
      }),
    }),
    TelegrafModule.forRootAsync({
      botName: 'capital_bot',
      imports: [ConfigModule],
      inject: [TelegramConfig],
      useFactory: (telegramConfig: TelegramConfig) => ({
        token: telegramConfig.bot_token,
        middlewares: [
          session({
            defaultSession(ctx) {
              const object: ITelegramDefaultSession = {
                is_main: true,
                replenish_chat_id: telegramConfig.replenish_chat_id,
                withdraw_chat_id: telegramConfig.withdraw_chat_id,
                bet: {
                  type: EBookmakers.MELBET,
                  assets: {
                    id: assets.xbet.id,
                  },
                  price: {
                    max: 100000,
                    min: 35,
                  },
                },
              };
              return object;
            },
          }),
        ],
        include: [TelegramModule],
        launchOptions: {
          allowedUpdates: [],
          dropPendingUpdates: true,
        },
      }),
    }),
    TelegrafModule.forRootAsync({
      botName: 'capital_x_bot',
      imports: [ConfigModule],
      inject: [XbetConfig, TelegramConfig],
      useFactory: (
        melbetConfig: XbetConfig,
        telegramConfig: TelegramConfig,
      ) => ({
        token: melbetConfig.bot_token,
        middlewares: [
          session({
            defaultSession(ctx) {
              const object: ITelegramDefaultSession = {
                is_main: false,
                replenish_chat_id: telegramConfig.replenish_chat_id,
                withdraw_chat_id: telegramConfig.withdraw_chat_id,
                bet: {
                  type: EBookmakers.XBET,
                  assets: {
                    id: assets.xbet.id,
                  },
                  price: {
                    max: 100000,
                    min: 35,
                  },
                },
              };
              return object;
            },
          }),
        ],
        include: [TelegramModule],
        launchOptions: {
          allowedUpdates: [],
          dropPendingUpdates: true,
        },
      }),
    }),
    TelegrafModule.forRootAsync({
      botName: 'capital_melbet_bot',
      imports: [ConfigModule],
      inject: [MelbetConfig],
      useFactory: (melbetConfig: MelbetConfig) => ({
        token: melbetConfig.bot_token,
        middlewares: [
          session({
            defaultSession(ctx) {
              const object: ITelegramDefaultSession = {
                is_main: false,
                replenish_chat_id: melbetConfig.replenish_chat_id,
                withdraw_chat_id: melbetConfig.withdraw_chat_id,
                bet: {
                  type: EBookmakers.MELBET,
                  assets: {
                    id: assets.xbet.id,
                  },
                  price: {
                    max: 100000,
                    min: 35,
                  },
                },
              };
              return object;
            },
          }),
        ],
        include: [TelegramModule],
        launchOptions: {
          allowedUpdates: [],
          dropPendingUpdates: true,
        },
      }),
    }),
    TelegrafModule.forRootAsync({
      botName: 'admin_capital_bot',
      imports: [ConfigModule],
      inject: [TelegramConfig],
      useFactory: (telegramConfig: TelegramConfig) => ({
        token: telegramConfig.admin_bot_token,
        middlewares: [
          session({
            defaultSession(ctx) {
              const object: ITelegramDefaultSession = {
                is_main: true,
                replenish_chat_id: telegramConfig.replenish_chat_id,
                withdraw_chat_id: telegramConfig.withdraw_chat_id,
                bet: {
                  type: EBookmakers.MELBET,
                  assets: {
                    id: assets.xbet.id,
                  },
                  price: {
                    max: 100000,
                    min: 50,
                  },
                },
              };
              return object;
            },
          }),
        ],
        include: [TelegramAdminModule],
        launchOptions: {
          allowedUpdates: [],
          dropPendingUpdates: true,
        },
      }),
    }),
    TelegramModule,
    ReplenishModule,
    WithdrawModule,
    UserModule,
    BankModule,
    FaqModule,
    KeyupModule,
    TelegramAdminModule,
    LocalFileModule,
    QrcodeModule,
    AxiosModule,
    AutoReplyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
