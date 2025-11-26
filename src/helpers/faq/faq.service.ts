/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { Faq } from './entities/faq.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileFaqService } from '../local-file/services/faq.service';

@Injectable()
export class FaqService implements OnModuleInit {
  constructor(
    @InjectRepository(Faq) private readonly repository: Repository<Faq>,
    private readonly fileFaqService: FileFaqService,
  ) {}

  public faq: Faq = {
    id: 10000,
    link: 'https://t.me/DreamOperand',
    username: '@DreamOperand',
  };

  public faq_list: Faq[] = [this.faq];

  async onModuleInit() {
    const bank_data = await this.fileFaqService.readFaqJsonFile();
    this.faq = bank_data;
  }

  async changeFaq(faq: Faq) {
    this.faq = faq;
    await this.fileFaqService.writeFaqJsonFile(faq);
  }

  async create(createFaqDto: CreateFaqDto) {
    const createFaq = this.repository.create(createFaqDto);
    const faq = await this.repository.save(createFaq);

    return faq;
  }

  async findAll() {
    const list = await this.repository.find();

    return [...this.faq_list, ...list];
  }

  async findOne(id: number) {
    const findFaq = this.faq_list.find((faq) => faq.id === id);
    if (findFaq) return findFaq;
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, updateFaqDto: UpdateFaqDto) {
    return await this.repository.update(id, updateFaqDto);
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }
}
