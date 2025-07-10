import { Injectable } from '@nestjs/common';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';
import { UpdateWithdrawDto } from './dto/update-withdraw.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Withdraw } from './entities/withdraw.entity';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { ERequest } from 'src/shared/types/request';
import { User } from '../user/entities/user.entity';

@Injectable()
export class WithdrawService {
  constructor(
    @InjectRepository(Withdraw)
    private readonly repository: Repository<Withdraw>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createWithdrawDto: CreateWithdrawDto) {
    const { telegram_id, ...rest } = createWithdrawDto;

    const user = await this.userRepository.findOne({ where: { telegram_id } });

    if (!user) return;

    const newWithdraw: DeepPartial<Withdraw> = {
      ...rest,
      status: ERequest.PENDING,
      user,
    };
    const create = this.repository.create(newWithdraw);
    const withdraw = await this.repository.save(create);
    return withdraw;
  }

  async findAll(options?: FindManyOptions<Withdraw> | undefined) {
    return await this.repository.find(options);
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async findOneWithOptions(options: FindOneOptions<Withdraw>) {
    return await this.repository.findOne(options);
  }

  async update(id: number, updateWithdrawDto: UpdateWithdrawDto) {
    return await this.repository.update(id, updateWithdrawDto);
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }
}
