import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { users } from 'model';

@Global()
@Module({
  imports: [SequelizeModule.forFeature([users])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
