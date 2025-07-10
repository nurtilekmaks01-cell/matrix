import { Module } from '@nestjs/common';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from './entities/bank.entity';
import { LocalFileModule } from 'src/helpers/local-file/local-file.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bank]), LocalFileModule],
  controllers: [BankController],
  providers: [BankService],
  exports: [BankService],
})
export class BankModule {}
