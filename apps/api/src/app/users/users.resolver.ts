import { Resolver, Query, Args, ResolveProperty, Parent } from "@nestjs/graphql";
import { UsersService } from './users.service';
import { CommentsService } from '../comments/comments.service';
import { UserEntity } from '../entities';

@Resolver('User')
export class UsersResolver {
  constructor(private usersService: UsersService, private commentsService: CommentsService) { }
  @Query()
  users(@Args('page') page: number) {
    return this.usersService.showAllUsers(page);
  }

  @ResolveProperty()
  comments(@Parent() user: UserEntity) {
    const { id } = user;
    return this.commentsService.getCommentsByUser(id);
  }
}