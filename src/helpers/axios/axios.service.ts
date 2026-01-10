import { Injectable } from '@nestjs/common';
import { XBetService } from './services/xbet.service';
import { MelbetService } from './services/melbet.service';
import { OneWinService } from './services/win.service';

@Injectable()
export class AxiosService {
  constructor(
    private readonly xbetService: XBetService,
    private readonly melbetService: MelbetService,
    private readonly onewinService: OneWinService,
  ) {}

  async getBalance() {
    return await this.xbetService.getBalance();
  }

  async findPlayer(userId: string) {
    return await this.xbetService.findPlayer(userId);
  }

  async deposit(userId: string, amount: number) {
    return await this.xbetService.depositToPlayer(userId, amount);
  }

  async payout(userId: string, code: string) {
    return await this.xbetService.payoutToPlayer(userId, code);
  }

  async getMelbetBalance() {
    return await this.melbetService.getBalance();
  }

  async getMelbetUserInfo(userId: string) {
    return await this.melbetService.findPlayer(userId);
  }

  async createMelbetDeposit(userId: string, amount: number, ing?: string) {
    return await this.melbetService.depositToPlayer(userId, amount, ing);
  }

  async createMelbetPayout(userId: string, code: string, ing?: string) {
    return await this.melbetService.payoutFromPlayer(userId, code, ing);
  }

  async createOneWinDeposit(userId: number, amount: number) {
    return await this.onewinService.createDeposit({ userId, amount });
  }

  async createOneWinWithdrawal(userId: number, code: number) {
    return await this.onewinService.createWithdrawal({
      userId: userId,
      code,
    });
  }
}
