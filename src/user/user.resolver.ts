import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { AuthGuard } from '~/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from './user.entity';

@Resolver()
export class UserResolver {
  constructor(private usersService: UserService) {}

  @UseGuards(AuthGuard)
  @Query(() => [User], { name: 'users' })
  async findAll() {
    return this.usersService.findAll({});
  }

  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'user' })
  async findOne(@Args('id') id: string) {
    return this.usersService.findOne({ _id: id });
  }

  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'me' })
  async me(@Context('user') user: Ctx['user']) {
    return this.usersService.findOne({ _id: user._id });
  }
}
