import { Injectable } from '@nestjs/common';
import { CreateReplenishDto } from './dto/create-replenish.dto';
import { UpdateReplenishDto } from './dto/update-replenish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Replenish } from './entities/replenish.entity';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { User } from '../user/entities/user.entity';
import { ERequest } from 'src/shared/types/request';

@Injectable()
export class ReplenishService {
  constructor(
    @InjectRepository(Replenish)
    private readonly repository: Repository<Replenish>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createReplenishDto: CreateReplenishDto) {
    const { telegram_id, ...replenish } = createReplenishDto;

    const user = await this.userRepository.findOne({ where: { telegram_id } });

    const newReplenish: DeepPartial<Replenish> = {
      ...replenish,
      status: ERequest.PENDING,
    };

    if (user) {
      newReplenish.user = user;
    }

    const createReplenish = this.repository.create(newReplenish);
    const saveReplenish = await this.repository.save(createReplenish);
    return saveReplenish;
  }

  async findAll() {
    return await this.repository.find();
  }

  async findAllWithOptions(options?: FindManyOptions<Replenish> | undefined) {
    return await this.repository.find(options);
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async findOneWithOptions(options: FindOneOptions<Replenish>) {
    return await this.repository.findOne(options);
  }

  async update(id: number, updateReplenishDto: UpdateReplenishDto) {
    return await this.repository.update(id, updateReplenishDto);
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }
}
