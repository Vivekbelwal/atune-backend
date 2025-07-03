import { Resolver, Query, Mutation, Args, Context, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { FileService } from '~/file/file.service';
import { AuthGuard } from '~/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { File } from '~/file/file.entity';
import { UpdateUserInput } from './user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private usersService: UserService,
    private fileService: FileService,
  ) {}

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
    const userData = await this.usersService.findOne({ _id: user._id });
    if (!userData) {
      throw new Error('User not found');
    }
    return userData;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User, { name: 'updateUser' })
  updateUser(@Args('input') input: UpdateUserInput, @Context('user') user: Ctx['user']) {
    return this.usersService.updateUser(user._id.toString(), input);
  }

  @ResolveField(() => File, { nullable: true })
  avatar(@Parent() user: User) {
    if (!user.avatarId) {
      return null;
    }

    return this.fileService.findOne({ _id: user.avatarId });
  }
}
