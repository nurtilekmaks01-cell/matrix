import { Injectable } from '@nestjs/common';
import { XbetConfig } from 'src/helpers/config/services/xbet.config';
import {
  generateConfirm,
  generateMD5,
  generateSHA256,
} from '../shared/helpers/crypto.helper';
import { HttpService } from '@nestjs/axios';
import { Context, Telegraf } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';
import { TelegramConfig } from 'src/helpers/config/services/telegram.config';
import * as moment from 'moment';

@Injectable()
export class XBetService {
  private readonly apiUrl: string;
  private readonly hash: string;
  private readonly cashierPass: string;
  private readonly login: string;
  private readonly cashdeskId: number;

  private readonly error_chat_id: string;

  constructor(
    private readonly xbetConfig: XbetConfig,
    private readonly httpService: HttpService,
    @InjectBot('capital_bot') private telegraf: Telegraf<Context>,
    private readonly telegramConfig: TelegramConfig,
  ) {
    this.apiUrl = xbetConfig.api_url;
    this.hash = xbetConfig.hash;
    this.cashierPass = xbetConfig.cashier_pass;
    this.login = xbetConfig.login;
    this.cashdeskId = xbetConfig.cashdesk_id;

    this.error_chat_id = telegramConfig.error_chat_id;
  }

  async getBalance() {
    const dt = moment().utc().format('YYYY-MM-DD HH:mm:ss');

    // Calculate SHA256 and MD5 hashes
    const shaString = `hash=${this.hash}&cashierpass=${this.cashierPass}&dt=${dt}`;
    const md5String = `dt=${dt}&cashierpass=${this.cashierPass}&cashdeskid=${this.cashdeskId}`;

    // Generate the signature for headers
    const sign = generateSHA256(
      generateSHA256(shaString) + generateMD5(md5String),
    );

    // Generate confirm string
    const confirm = generateConfirm(String(this.cashdeskId), this.hash);

    try {
      const response = await this.httpService.axiosRef.get(
        `${this.apiUrl}Cashdesk/${this.cashdeskId}/Balance`,
        {
          headers: { sign },
          params: { confirm, dt },
        },
      );
      return response.data;
    } catch (error) {
      this.telegraf.telegram.sendMessage(
        this.error_chat_id,
        `getBalance:src/helpers/axios/services/xbet.service.ts:${error}`,
      );
    }
  }

  async findPlayer(
    userId: string,
  ): Promise<{ UserId: number; CurrencyId: 0; Name?: string } | null> {
    const shaString = `hash=${this.hash}&userid=${userId}&cashdeskid=${this.cashdeskId}`;
    const md5String = `userid=${userId}&cashierpass=${this.cashierPass}&hash=${this.hash}`;
    const sign = generateSHA256(
      generateSHA256(shaString) + generateMD5(md5String),
    );
    const confirm = generateConfirm(userId, this.hash as string);

    try {
      const response = await this.httpService.axiosRef.get(
        `${this.apiUrl}Users/${userId}`,
        {
          headers: { sign },
          params: { confirm, cashdeskId: this.cashdeskId },
        },
      );

      return response.data;
    } catch (error) {
      this.telegraf.telegram.sendMessage(
        this.error_chat_id,
        `findPlayer:src/helpers/axios/services/xbet.service.ts:${error}`,
      );
      return null;
    }
  }

  async depositToPlayer(userId: string, amount: number, lng: string = 'ru') {
    const shaString = `hash=${this.hash}&lng=${lng}&userid=${userId}`;
    const md5String = `summa=${amount}&cashierpass=${this.cashierPass}&cashdeskid=${this.cashdeskId}`;
    const sign = generateSHA256(
      generateSHA256(shaString) + generateMD5(md5String),
    );
    const confirm = generateConfirm(userId, this.hash);

    try {
      const response = await this.httpService.axiosRef.post(
        `${this.apiUrl}Deposit/${userId}/Add`,
        {
          cashdeskId: this.cashdeskId,
          lng,
          summa: amount,
          confirm,
        },
        { headers: { sign } },
      );

      return response.data;
    } catch (error) {
      this.telegraf.telegram.sendMessage(
        this.error_chat_id,
        `depositToPlayer:src/helpers/axios/services/xbet.service.ts:${error}`,
      );
    }
  }

  async payoutToPlayer(userId: string, code: string, lng: string = 'ru') {
    const shaString = `hash=${this.hash}&lng=${lng}&userid=${userId}`;
    const md5String = `code=${code}&cashierpass=${this.cashierPass}&cashdeskid=${this.cashdeskId}`;
    const sign = generateSHA256(
      generateSHA256(shaString) + generateMD5(md5String),
    );
    const confirm = generateConfirm(userId, this.hash);

    try {
      const response = await this.httpService.axiosRef.post(
        `${this.apiUrl}Deposit/${userId}/Payout`,
        {
          cashdeskId: this.cashdeskId,
          lng,
          code,
          confirm,
        },
        { headers: { sign } },
      );

      return response.data;
    } catch (error) {
      this.telegraf.telegram.sendMessage(
        this.error_chat_id,
        `payoutToPlayer:src/helpers/axios/services/xbet.service.ts:${error}`,
      );
    }
  }
}
