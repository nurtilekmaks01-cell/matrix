/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  BalanceResponseDto,
  DepositRequestDto,
  OperationResponseDto,
  PayoutRequestDto,
  UserResponseDto,
} from '../dto/melbet.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as crypto from 'crypto';
import { MelbetConfig } from 'src/helpers/config/services/melbet.config';

@Injectable()
export class MelbetService {
  private readonly axiosRef;

  constructor(
    private readonly config: MelbetConfig,
    private readonly httpService: HttpService,
  ) {
    this.axiosRef = this.httpService.axiosRef;
  }

  private calculateMD5(data: string): string {
    return crypto.createHash('md5').update(data).digest('hex');
  }

  private calculateSHA256(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  private formatDate(date: Date): string {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
  }

  // 1. Get Cash Desk Balance
  async getBalance(): Promise<BalanceResponseDto> {
    const dt = this.formatDate(new Date());

    // 1.2. Generate confirm string
    const confirm = this.calculateMD5(
      `${this.config.cashdeskid}:${this.config.hash}`,
    );

    // 1.1. Generate signature
    const step1a = this.calculateSHA256(
      `hash=${this.config.hash}&cashierpass=${this.config.cashierpass}&dt=${dt}`,
    );
    const step1b = this.calculateMD5(
      `dt=${dt}&cashierpass=${this.config.cashierpass}&cashdeskid=${this.config.cashdeskid}`,
    );
    const signature = this.calculateSHA256(step1a + step1b);

    const url = `${this.config.baseUrl}Cashdesk/${this.config.cashdeskid}/Balance?confirm=${confirm}&dt=${encodeURIComponent(dt)}`;

    try {
      const response = await firstValueFrom(
        this.httpService.get<BalanceResponseDto>(url, {
          headers: {
            sign: signature,
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to get balance: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // 2. Find Player
  async findPlayer(userId: string): Promise<UserResponseDto> {
    // 2.2. Generate confirm string
    const confirm = this.calculateMD5(`${userId}:${this.config.hash}`);

    // 2.1. Generate signature
    const step2a = this.calculateSHA256(
      `hash=${this.config.hash}&userid=${userId}&cashdeskid=${this.config.cashdeskid}`,
    );
    const step2b = this.calculateMD5(
      `userid=${userId}&cashierpass=${this.config.cashierpass}&hash=${this.config.hash}`,
    );
    const signature = this.calculateSHA256(step2a + step2b);

    const url = `${this.config.baseUrl}Users/${userId}?confirm=${confirm}&cashdeskid=${this.config.cashdeskid}`;

    try {
      const response = await firstValueFrom(
        this.httpService.get<UserResponseDto>(url, {
          headers: {
            sign: signature,
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to find player: ${error?.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // 3. Deposit to Player Account
  async depositToPlayer(
    userId: string,
    summa: number,
    ing: string = 'ru',
  ): Promise<OperationResponseDto> {
    // 3.2. Generate confirm string
    const confirm = this.calculateMD5(`${userId}:${this.config.hash}`);

    // 3.1. Generate signature
    const step3a = this.calculateSHA256(
      `hash=${this.config.hash}&lng=${ing}&userid=${userId}`,
    );
    const step3b = this.calculateMD5(
      `summa=${summa}&cashierpass=${this.config.cashierpass}&cashdeskid=${this.config.cashdeskid}`,
    );
    const signature = this.calculateSHA256(step3a + step3b);

    const depositData: DepositRequestDto = {
      cashdeskid: parseInt(this.config.cashdeskid),
      lng: ing,
      summa: summa,
      confirm: confirm,
    };

    const url = `${this.config.baseUrl}Deposit/${userId}/Add`;

    try {
      const response = await firstValueFrom(
        this.httpService.post<OperationResponseDto>(url, depositData, {
          headers: {
            sign: signature,
            'Content-Type': 'application/json',
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to deposit to player: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // 4. Payout from Player Account
  async payoutFromPlayer(
    userId: string,
    code: string,
    ing: string = 'ru',
  ): Promise<OperationResponseDto> {
    // 4.2. Generate confirm string
    const confirm = this.calculateMD5(`${userId}:${this.config.hash}`);

    // 4.1. Generate signature
    const step4a = this.calculateSHA256(
      `hash=${this.config.hash}&lng=${ing}&userid=${userId}`,
    );
    const step4b = this.calculateMD5(
      `code=${code}&cashierpass=${this.config.cashierpass}&cashdeskid=${this.config.cashdeskid}`,
    );
    const signature = this.calculateSHA256(step4a + step4b);

    const payoutData: PayoutRequestDto = {
      cashdeskid: parseInt(this.config.cashdeskid),
      lng: ing,
      code: code,
      confirm: confirm,
    };

    const url = `${this.config.baseUrl}Deposit/${userId}/Payout`;

    try {
      const response = await firstValueFrom(
        this.httpService.post<OperationResponseDto>(url, payoutData, {
          headers: {
            sign: signature,
            'Content-Type': 'application/json',
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to payout from player: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}