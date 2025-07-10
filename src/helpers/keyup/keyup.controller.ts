import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KeyupService } from './keyup.service';
import { CreateKeyupDto } from './dto/create-keyup.dto';
import { UpdateKeyupDto } from './dto/update-keyup.dto';

@Controller('keyup')
export class KeyupController {
  constructor(private readonly keyupService: KeyupService) {}

  @Post()
  create(@Body() createKeyupDto: CreateKeyupDto) {
    return this.keyupService.create(createKeyupDto);
  }

  @Get()
  findAll() {
    return this.keyupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.keyupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKeyupDto: UpdateKeyupDto) {
    return this.keyupService.update(+id, updateKeyupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.keyupService.remove(+id);
  }
}
