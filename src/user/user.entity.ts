import { Field, ObjectType } from '@nestjs/graphql';
import { BaseItem } from '~/base/base.entity';
import { File } from '~/file/file.entity';

@ObjectType()
export class User extends BaseItem {
  @Field({ description: "User's name" })
  name: string;

  @Field({ description: "User's email" })
  email: string;

  @Field({ description: "User's avatar file ID", nullable: true })
  avatarId?: string;

  // resolve fields
  avatar?: File;
}
