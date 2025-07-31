import { Injectable } from '@nestjs/common';
import { XBetService } from './services/xbet.service';

@Injectable()
export class AxiosService {
  constructor(private readonly xbetService: XBetService) {}

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
}
