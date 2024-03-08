import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { threads } from 'model';

@Module({
  imports: [SequelizeModule.forFeature([threads])],
  controllers: [ThreadsController],
  providers: [ThreadsService],
})
export class ThreadsModule {}
