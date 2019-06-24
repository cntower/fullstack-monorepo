import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../entities';
import { UserEntity } from '../entities';
import { CommentEntity } from '../entities';
import { PostsModule } from '../posts/posts.module';
import { CommentResolver } from './comments.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, UserEntity, CommentEntity]),
    PostsModule
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentResolver]
})
export class CommentsModule { }
