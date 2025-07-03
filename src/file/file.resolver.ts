import { Resolver, Query, Mutation, Args, Context, ResolveField, Parent } from '@nestjs/graphql';
import { FileService } from './file.service';
import { UserService } from '~/user/user.service';
import { AuthGuard } from '~/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { File } from './file.entity';
import { User } from '~/user/user.entity';
import { UploadFileInput } from './file.input';

@Resolver(() => File)
export class FileResolver {
  constructor(
    private fileService: FileService,
    private userService: UserService,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => File, { name: 'uploadFile' })
  uploadFile(@Args('input') input: UploadFileInput, @Context('user') user: Ctx['user']) {
    try {
      return this.fileService.uploadFile(input.file, input.fileType, user._id);
    } catch (error) {
      throw new Error(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  @UseGuards(AuthGuard)
  @Query(() => File, { name: 'file' })
  getFile(@Args('id') id: string) {
    return this.fileService.findOne({ _id: id });
  }

  @ResolveField(() => User)
  async user(@Parent() file: File) {
    return this.userService.findOne({ _id: file.userId });
  }
}
