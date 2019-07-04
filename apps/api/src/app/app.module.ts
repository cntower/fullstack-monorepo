import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR, APP_FILTER, APP_PIPE } from '@nestjs/core';
import { DataInterceptor } from './shared/data.interceptor';
import { CommentsModule } from './comments/comments.module';
// import { CommentEntity } from './comments/comment.entity';
import { UsersModule } from './users/users.module';
import { UserEntity } from './entities';
import { PostsModule } from './posts/posts.module';
import { PostEntity } from './entities';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { CommentEntity } from './entities';
import { GraphQLModule } from '@nestjs/graphql';
import { ReqValidationPipe } from './shared/req-validation.pipe';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.API_DB_USERNAME,
      password: process.env.API_DB_PASSWORD,
      database: process.env.API_DB_NAME,
      entities: [UserEntity, CommentEntity, PostEntity,],
      synchronize: true,
      logging: true,
      // dropSchema: true
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ headers: req.headers })
    }),
    PostsModule,
    UsersModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    },
    {
      provide: APP_PIPE,
      useClass: ReqValidationPipe,
    }
  ]
})
export class AppModule { }
