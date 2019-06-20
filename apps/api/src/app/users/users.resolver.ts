import { Resolver, Query } from "@nestjs/graphql";

@Resolver('User')
export class UsersResolver {
  @Query()
  users() {
    return [{ id: 'id', username: 'username' }];
  }
}