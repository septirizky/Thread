import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ThreadsModule } from './threads/threads.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoginModule } from './login/login.module';
import { cekToken } from './auth/middleware';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'postgres',
        host: process.env.HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        models: [],
        autoLoadModels: true,
      }),
    }),
    UsersModule,
    ThreadsModule,
    LoginModule,
    CommentsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cekToken)
      .exclude(
        { path: 'login', method: RequestMethod.POST },
        { path: 'users', method: RequestMethod.POST },
      )
      // .forRoutes('consumer');
      .forRoutes('*');
  }
}
