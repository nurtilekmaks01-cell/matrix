import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config.service';

@Injectable()
export class DBConfig {
  public db_host: string;
  public db_port: number;
  public db_username: string;
  public db_password: string;
  public db_database: string;

  constructor(private readonly configService: ConfigService) {
    this.db_host = configService.getString('DB_HOST');
    this.db_port = configService.getNumber('DB_PORT');
    this.db_username = configService.getString('DB_USERNAME');
    this.db_password = configService.getString('DB_PASSWORD');
    this.db_database = configService.getString('DB_DATABASE');
  }
}
