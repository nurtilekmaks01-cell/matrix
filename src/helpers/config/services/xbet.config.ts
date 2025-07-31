import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config.service';

@Injectable()
export class XbetConfig {
  public hash: string;
  public cashier_pass: string;
  public login: string;
  public cashdesk_id: number;
  public api_url: string;

  constructor(private readonly configService: ConfigService) {
    this.hash = configService.getString('XBET_HASH');
    this.cashier_pass = configService.getString('XBET_CASHIER_PASS');
    this.login = configService.getString('XBET_LOGIN');
    this.cashdesk_id = configService.getNumber('XBET_CASHDESK_ID');
    this.api_url = configService.getString('XBET_API');
  }
}
