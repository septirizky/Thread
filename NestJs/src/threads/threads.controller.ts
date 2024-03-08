import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CreateThreadsDto, UpdateThreadsDto } from './threadsdto.dto';

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Post()
  create(@Body() fields: CreateThreadsDto) {
    return this.threadsService.create(fields);
  }

  @Get()
  findAll() {
    return this.threadsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.threadsService.threadUser(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() fields: UpdateThreadsDto) {
    return this.threadsService.update(+id, fields);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.threadsService.remove(+id);
  }
}
