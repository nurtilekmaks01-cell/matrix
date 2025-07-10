import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config.service';

@Injectable()
export class AppConfig {
  public port: number;

  constructor(private readonly configService: ConfigService) {
    this.port = configService.getNumber('APP_PORT');
  }
}
