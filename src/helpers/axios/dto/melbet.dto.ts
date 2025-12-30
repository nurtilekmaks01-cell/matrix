export class MelApiConfigDto {
  hash: string;
  cashierpass: string;
  login: string;
  cashdeskid: string;
  baseUrl: string = 'https://partners.servcul.com/CashdeskBotAPI/';
}

export class BalanceResponseDto {
  Balance: number | null;
  Limit: number | null;
}

export class UserResponseDto {
  CurrencyId: number;
  UserId: number;
  name: string;
}

export class OperationResponseDto {
  Summa: number | null;
  Success: boolean;
  MessageId: number | null;
  Message: string;
}

export class DepositRequestDto {
  cashdeskid: number;
  lng: string;
  summa: number;
  confirm: string;
}

export class PayoutRequestDto {
  cashdeskid: number;
  lng: string;
  code: string;
  confirm: string;
}