import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './users.resolver';
import {UserEntity, PostEntity, CommentEntity } from '../entities';
import { CommentsService } from '../comments/comments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, PostEntity, CommentEntity])
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver, CommentsService]
})
export class UsersModule { }
