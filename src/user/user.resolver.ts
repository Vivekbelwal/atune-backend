import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserInput } from './user.input';

@Resolver()
export class UserResolver {
  constructor(private usersService: UserService) {}

  @Query(() => [User])
  async users() {
    return this.usersService.findAll({});
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.usersService.create(input);
  }
}
