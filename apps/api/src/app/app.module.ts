import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post/post.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataInterceptor } from './util/data.interceptor';
import { PostsModule } from './posts/posts.module';

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
    },
  ]
})
export class AppModule { }
