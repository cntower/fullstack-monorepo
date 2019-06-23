import { Resolver, Query, Args, ResolveProperty, Parent, Mutation, Context } from "@nestjs/graphql";
import { UsersService } from './users.service';
import { CommentsService } from '../comments/comments.service';
import { UserEntity } from '../entities';
import { UserDTO } from './models/user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../shared/auth.guard';

@Resolver('User')
export class UsersResolver {
  constructor(private usersService: UsersService, private commentsService: CommentsService) { }
  @Query()
  users(@Args('page') page: number) {
    return this.usersService.showAllUsers(page);
  }
  @Query()
  user(@Args('username') username: string) {
    return this.usersService.get(username);
  }
  @Query()
  @UseGuards(new AuthGuard())
  whoami(@Context('user') user) {
    const { username } = user;
    return this.usersService.get(username);
  }
  @Mutation()
  login(@Args('username') username: string, @Args('password') password: string) {
    const user: UserDTO = { username, password };
    return this.usersService.login(user);
  }
  @Mutation()
  register(@Args() { username, password }: UserDTO) {
    const user: UserDTO = { username, password };
    return this.usersService.register(user);
  }

  @ResolveProperty()
  comments(@Parent() user: UserEntity) {
    const { id } = user;
    return this.commentsService.getCommentsByUser(id);
  }
}