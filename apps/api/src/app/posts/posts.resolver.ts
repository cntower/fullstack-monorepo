import { Resolver, Query, Args, ResolveProperty, Parent, Mutation, Context } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { CommentsService } from '../comments/comments.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../shared/auth.guard';
import { PostDTO } from './models/post.dto';
import { Votes } from '../shared/votes.enum';

@Resolver('Post')
export class PostsResolver {
  constructor(private postsService: PostsService, private commentsService: CommentsService) { }

  @Query()
  async posts(@Args('page') page: number) {
    return await this.postsService.getPosts(page);
  }
  @Query()
  async post(@Args('id') id: string) {
    return await this.postsService.getPost(id);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async createPost(@Args() { title, description }: PostDTO, @Context('user') user) {
    return await this.postsService.createPost(user.id, { title, description });
  }
  @Mutation()
  @UseGuards(new AuthGuard())
  async updatePost(@Args('id') id: string, @Args() { title, description }: PostDTO, @Context('user') { id: userId }) {
    return await this.postsService.updatePost(id, userId, { title, description });
  }
  @Mutation()
  @UseGuards(new AuthGuard())
  async deletePost(@Args('id') id: string, @Context('user') { id: userId }) {
    return await this.postsService.deletePost(id, userId);
  }
  @Mutation()
  @UseGuards(new AuthGuard())
  async upvote(@Args('id') id: string, @Context('user') { id: userId }) {
    return await this.postsService.vote(id, userId, Votes.UP);
  }
  @Mutation()
  @UseGuards(new AuthGuard())
  async downvote(@Args('id') id: string, @Context('user') { id: userId }) {
    return await this.postsService.vote(id, userId, Votes.DOWN);
  }
  @Mutation()
  @UseGuards(new AuthGuard())
  async bookmark(@Args('id') id: string, @Context('user') { id: userId }) {
    return await this.postsService.bookmark(id, userId);
  }
  @Mutation()
  @UseGuards(new AuthGuard())
  async unbookmark(@Args('id') id: string, @Context('user') { id: userId }) {
    return await this.postsService.unbookmark(id, userId);
  }

  @ResolveProperty('comments')
  comments(@Parent() post) {
    const { id } = post;
    return this.commentsService.getCommentsByPost(id);
  }
}
