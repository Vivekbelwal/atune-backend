import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { AuthGuard } from '~/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from './user.entity';

@Resolver()
export class UserResolver {
  constructor(private usersService: UserService) {}

  @UseGuards(AuthGuard)
  @Query(() => [User])
  async users() {
    return this.usersService.findAll({});
  }
}
