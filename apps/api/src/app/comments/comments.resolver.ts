import { Resolver, Query, Args, Mutation, Context } from "@nestjs/graphql";
import { CommentsService } from './comments.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../shared/auth.guard';
import { CommentDTO } from './models/comment.dto';
import { async } from 'rxjs/internal/scheduler/async';

@Resolver('comment')
export class CommentResolver {
  constructor(private commentsService: CommentsService) { }
  @Query()
  async comment(@Args('id') id: string) {
    return await this.commentsService.getComment(id);
  }
  @Mutation()
  @UseGuards(new AuthGuard())
  async createComment(@Args('postId') postId: string, @Args('comment') comment: string, @Context('user') user) {
    const data: CommentDTO = { comment };
    const { id: userId } = user;
    console.log('createComment')

    return await this.commentsService.createComment(postId, userId, data);
  }
  @Mutation()
  @UseGuards(new AuthGuard())
  async deleteComment(@Args('id') id: string, @Context('user') user) {
    const { id: userId } = user;
    return await this.commentsService.deleteComment(id, userId);
  }

}