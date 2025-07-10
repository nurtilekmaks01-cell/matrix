import { Injectable } from '@nestjs/common';
import { CreateKeyupDto } from './dto/create-keyup.dto';
import { UpdateKeyupDto } from './dto/update-keyup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Keyup } from './entities/keyup.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class KeyupService {
  constructor(
    @InjectRepository(Keyup) private readonly repository: Repository<Keyup>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createKeyupDto: CreateKeyupDto) {
    const { telegram_id, ...rest } = createKeyupDto;
    const user = await this.userRepository.findOne({ where: { telegram_id } });
    if (!user) return;

    const keyupValues = { ...rest, user };

    const findKeyup = await this.repository.findOne({
      where: { value: rest.value },
    });

    if (findKeyup) return;

    const createKeyup = this.repository.create(keyupValues);
    const keyup = await this.repository.save(createKeyup);
    return keyup;
  }

  async findAll() {
    return await this.repository.find();
  }

  async findAllWithOptions(options?: FindManyOptions<Keyup> | undefined) {
    return await this.repository.find(options);
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async findOneWithOptions(options: FindOneOptions<Keyup>) {
    return await this.repository.findOne(options);
  }

  async update(id: number, updateKeyupDto: UpdateKeyupDto) {
    return await this.repository.update(id, updateKeyupDto);
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }
}
