import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config.service';

@Injectable()
export class MelbetConfig {
  bot_token: string;
  replenish_chat_id: string;
  withdraw_chat_id: string;

  public readonly hash: string;
  public readonly cashierpass: string;
  public readonly login: string;
  public readonly cashdeskid: string;
  public readonly baseUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.bot_token = this.configService.getString('MELBET_BOT_TOKEN');
    this.replenish_chat_id = this.configService.getString(
      'MELBET_REPLENISH_CHAT_ID',
    );
    this.withdraw_chat_id = this.configService.getString(
      'MELBET_WITHDRAW_CHAT_ID',
    );
    this.hash = this.configService.getString('MELBET_HASH');
    this.cashierpass = this.configService.getString('MELBET_CASHIERPASS');
    this.login = this.configService.getString('MELBET_LOGIN');
    this.cashdeskid = this.configService.getString('MELBET_CASHDESKID');
    this.baseUrl =
      this.configService.getString('MELBET_BASE_URL') ||
      'https://partners.servcul.com/CashdeskBotAPI/';
  }
}