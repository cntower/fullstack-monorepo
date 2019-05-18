import { Module, ValidationPipe } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post/post.entity';
import { APP_INTERCEPTOR, APP_FILTER, APP_PIPE } from '@nestjs/core';
import { DataInterceptor } from './shared/data.interceptor';
import { PostsModule } from './posts/posts.module';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
// import { ValidationPipe } from './shared/validation.pipe';

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
      entities: [PostEntity],
      synchronize: true,
      logging: true
    }),
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
