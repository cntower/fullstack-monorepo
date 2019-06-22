import { Resolver, Query, Args, ResolveProperty, Parent } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { PostEntity } from '../entities';
import { CommentsService } from '../comments/comments.service';
import { async } from 'rxjs/internal/scheduler/async';
import { of } from 'rxjs';

@Resolver('Post')
export class PostsResolver {
  constructor(private postsService: PostsService, private commentsService: CommentsService) { }

  @Query()
  async posts(@Args('page') page: number) {
    return this.postsService.getPosts(page);
  }

  @ResolveProperty('comments')
  comments(@Parent() post) {
    const { id } = post;
    return this.commentsService.getCommentsByPost(id);
  }
}
