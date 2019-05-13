import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts/posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../post/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  controllers: [PostsController],
  providers: [
    PostsService
  ]

})
export class PostsModule { }
