import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReplenishService } from './replenish.service';
import { CreateReplenishDto } from './dto/create-replenish.dto';
import { UpdateReplenishDto } from './dto/update-replenish.dto';

@Controller('replenish')
export class ReplenishController {
  constructor(private readonly replenishService: ReplenishService) {}

  @Post()
  create(@Body() createReplenishDto: CreateReplenishDto) {
    return this.replenishService.create(createReplenishDto);
  }

  @Get()
  findAll() {
    return this.replenishService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.replenishService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReplenishDto: UpdateReplenishDto) {
    return this.replenishService.update(+id, updateReplenishDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.replenishService.remove(+id);
  }
}
