/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-duplicate-type-constituents */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from './entities/bank.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { FileBankService } from 'src/helpers/local-file/services/bank.service';

@Injectable()
export class BankService implements OnModuleInit {
  public bank: Bank;
  constructor(
    @InjectRepository(Bank) private readonly repository: Repository<Bank>,
    private readonly fileBankService: FileBankService,
  ) {}

  async onModuleInit() {
    const bank_data = await this.fileBankService.readBankJsonFile();
    this.bank = bank_data;
  }

  async changeBank(bank: Bank) {
    this.bank = bank;
    await this.fileBankService.writeBankJsonFile(bank);
  }

  async create(createBankDto: CreateBankDto) {
    const createBank = this.repository.create(createBankDto);
    const bank = await this.repository.save(createBank);
    return bank;
  }

  async findAll() {
    return await this.repository.find();
  }

  async findAllWithOptions(options?: FindManyOptions<Bank> | undefined) {
    return await this.repository.find(options);
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async findOneWithOptions(options: FindOneOptions<Bank>) {
    return await this.repository.findOne(options);
  }

  async update(id: number, updateBankDto: UpdateBankDto) {
    return await this.repository.update(id, updateBankDto);
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }
}
