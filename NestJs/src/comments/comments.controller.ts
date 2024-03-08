import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentsDto, UpdateCommentsDto } from './commentsdto.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() fields: CreateCommentsDto) {
    return this.commentsService.create(fields);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() fields: UpdateCommentsDto) {
    return this.commentsService.update(+id, fields);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
