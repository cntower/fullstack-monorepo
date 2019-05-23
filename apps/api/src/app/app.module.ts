import { Module, ValidationPipe } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR, APP_FILTER, APP_PIPE } from '@nestjs/core';
import { DataInterceptor } from './shared/data.interceptor';
import { PostsModule } from './posts/posts.module';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
// import { ValidationPipe } from './shared/validation.pipe';
import { UsersModule } from './users/users.module';
import { PostEntity } from './posts/post.entity';
import { UserEntity } from './users/user.entity';


@Module({
  imports: [
    PostsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.API_DB_USERNAME,
      password: process.env.API_DB_PASSWORD,
      database: process.env.API_DB_NAME,
      entities: [PostEntity, UserEntity],
      synchronize: true,
      logging: true
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataInterceptor,
    }, {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    }, {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ]
})
export class AppModule { }
