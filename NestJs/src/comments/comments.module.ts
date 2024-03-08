import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { comments } from 'model';

@Module({
  imports: [SequelizeModule.forFeature([comments])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
