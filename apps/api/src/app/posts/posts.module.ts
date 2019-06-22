import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, PostEntity, CommentEntity } from '../entities';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { CommentsService } from '../comments/comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    UserEntity,
    PostEntity,
    CommentEntity
  ])],
  controllers: [PostsController],
  providers: [
    PostsService, PostsResolver, CommentsService
  ]

})
export class PostsModule { }
