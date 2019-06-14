import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, PostEntity } from '../entities';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    UserEntity,
    PostEntity,
  ])],
  controllers: [PostsController],
  providers: [
    PostsService
  ]

})
export class PostsModule { }
