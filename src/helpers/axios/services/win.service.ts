import { Injectable, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { FWinConfig } from 'src/helpers/config/services/win.config';

export interface DepositRequest {
  userId: number;
  amount: number;
}

export interface WithdrawalRequest {
  userId: number; // Исправлено: было withdrawalId
  code: number;
}

export interface CashOperationResponse {
  id: number;
  cashId: number;
  amount: number;
  userId: number;
}

export interface ApiError {
  statusCode: number;
  message: string;
  details?: any;
}

@Injectable()
export class OneWinService {
  private readonly logger = new Logger(OneWinService.name);
  private readonly apiBaseUrl = 'https://api.1win.win';
  private apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly onewinConfig: FWinConfig,
  ) {
    this.apiKey = this.onewinConfig.api_key;
    this.validateConfig();
  }

  private validateConfig(): void {
    if (!this.apiKey) {
      throw new Error('API key is not configured');
    }
    if (!this.apiKey.match(/^[a-f0-9]{64}$/)) {
      this.logger.warn('API key format seems incorrect');
    }
  }

  /**
   * Создание записи о внесении депозита
   */
  async createDeposit(
    depositData: DepositRequest,
  ): Promise<CashOperationResponse> {
    const url = `${this.apiBaseUrl}/v1/client/deposit`;

    this.logger.log(
      `Creating deposit for user ${depositData.userId}, amount: ${depositData.amount}`,
    );

    const headers = {
      'X-API-KEY': this.apiKey,
      'Content-Type': 'application/json',
    };

    const response: AxiosResponse<CashOperationResponse> =
      await this.httpService.axiosRef.post(url, depositData, {
        headers,
        timeout: 10000,
      });

    this.logger.log(`Deposit created successfully: ${response.data.id}`);
    return response.data;
  }

  /**
   * Осуществление вывода средств с проверкой кода
   */
  async createWithdrawal(
    withdrawalData: WithdrawalRequest,
  ): Promise<CashOperationResponse> {
    const url = `${this.apiBaseUrl}/v1/client/withdrawal`;

    this.logger.log(`Processing withdrawal for user ${withdrawalData.userId}`);

    const headers = {
      'X-API-KEY': this.apiKey,
      'Content-Type': 'application/json',
    };

    try {
      const response: AxiosResponse<CashOperationResponse> =
        await this.httpService.axiosRef.post(url, withdrawalData, {
          headers,
          timeout: 10000,
        });

      this.logger.log(`Withdrawal processed successfully: ${response.data.id}`);
      return response.data;
    } catch (error) {
      this.logger.error(
        `Withdrawal processing failed: ${error.response?.data?.message || error.message}`,
        error.response?.data,
      );

      const apiError: ApiError = {
        statusCode: error.response?.status || 500,
        message: this.getWithdrawalErrorMessage(error.response?.status),
        details: error.response?.data,
      };

      throw apiError;
    }
  }

  /**
   * Получение понятного сообщения об ошибке для депозита
   */
  private getDepositErrorMessage(statusCode: number): string {
    switch (statusCode) {
      case 400:
        return 'Сумма превышает лимиты, депозит уже был создан для этого пользователя или слишком большая комиссия за внесение депозита';
      case 403:
        return 'Доступ запрещен. Проверьте API ключ и права доступа';
      case 404:
        return 'Пользователь не найден';
      default:
        return 'Произошла ошибка при создании депозита';
    }
  }

  /**
   * Получение понятного сообщения об ошибке для вывода
   */
  private getWithdrawalErrorMessage(statusCode: number): string {
    switch (statusCode) {
      case 400:
        return 'Вывод находится в процессе обработки, сумма превышает лимиты, передан неверный идентификатор кассы, не корректный код, сумма вывода превышает доступный баланс в кассе или не корректный идентификатор кассы';
      case 403:
        return 'Доступ запрещен. Проверьте API ключ и права доступа';
      case 404:
        return 'Вывод не найден или пользователь не найден';
      default:
        return 'Произошла ошибка при обработке вывода';
    }
  }
}
