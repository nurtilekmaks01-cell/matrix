import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config.service';

@Injectable()
export class TelegramConfig {
  public bot_token: string;
  public admin_bot_token: string;
  public error_chat_id: string;

  public replenish_chat_id: string;
  public withdraw_chat_id: string;
  public auto_reply_chat_id: string;

  constructor(private readonly configService: ConfigService) {
    this.bot_token = configService.getString('TELEGRAM_BOT_TOKEN');
    this.admin_bot_token = configService.getString('TELEGRAM_ADMIN_BOT_TOKEN');
    this.error_chat_id = configService.getString('TELEGRAM_ERROR_CHAT_ID');
    this.replenish_chat_id = configService.getString(
      'TELEGRAM_REPLENISH_CHAT_ID',
    );
    this.withdraw_chat_id = configService.getString(
      'TELEGRAM_WITHDRAW_CHAT_ID',
    );
    this.auto_reply_chat_id = configService.getString(
      'TELEGRAM_AUTO_REPLY_CHAT_ID',
    );
  }
}
