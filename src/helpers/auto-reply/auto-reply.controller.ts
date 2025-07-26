import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AutoReplyService } from './auto-reply.service';
import { CreateAutoReplyDto } from './dto/create-auto-reply.dto';
import { UpdateAutoReplyDto } from './dto/update-auto-reply.dto';

@Controller('auto-reply')
export class AutoReplyController {
  constructor(private readonly autoReplyService: AutoReplyService) {}

  @Post()
  create(@Body() createAutoReplyDto: CreateAutoReplyDto) {
    return this.autoReplyService.create(createAutoReplyDto);
  }

  @Get()
  findAll() {
    return this.autoReplyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.autoReplyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAutoReplyDto: UpdateAutoReplyDto) {
    return this.autoReplyService.update(+id, updateAutoReplyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.autoReplyService.remove(+id);
  }
}
