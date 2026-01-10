import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config.service';

@Injectable()
export class FWinConfig {
  public readonly bot_token: string;

  public readonly replenish_chat_id: string;
  public readonly withdraw_chat_id: string;

  public readonly api_key: string;

  constructor(private readonly configService: ConfigService) {
    this.bot_token = configService.getString('1WIN_BOT_TOKEN');

    this.api_key = configService.getString('1WIN_API_KEY');
  }
}
