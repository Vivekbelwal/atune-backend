import { Field, ObjectType } from '@nestjs/graphql';
import { BaseItem } from '~/base/base.entity';
import { User } from '~/user/user.entity';

@ObjectType()
export class File extends BaseItem {
  @Field({ description: 'File URL in S3' })
  url: string;

  @Field({ description: 'File type/MIME type' })
  type: string;

  @Field({ description: 'ID of user who uploaded the file' })
  userId: string;

  user: User;
}
