import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { UpdateBanDto } from './dto/update-ban.dto';
import { userRelations } from './shared/constants/relations';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = { ...createUserDto, is_baned: false };

    const createUser = this.repository.create(newUser);
    const saveUser = await this.repository.save(createUser);
    return saveUser;
  }

  async findAll() {
    return await this.repository.find({
      relations: userRelations,
    });
  }

  async findOne(id: number) {
    return await this.repository.findOne({
      where: { id },
      relations: userRelations,
    });
  }

  async findOneWithOptions(options: FindOneOptions<User>) {
    return await this.repository.findOne({
      ...options,
      relations: userRelations,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.repository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }

  async updateBaned(updateBanDto: UpdateBanDto) {
    const { status, telegram_id } = updateBanDto;
    const findUser = await this.repository.findOne({ where: { telegram_id } });

    if (!findUser) return;

    await this.repository.update(findUser.id, { is_baned: status });
  }
}
