import { Field, ObjectType } from '@nestjs/graphql';
import { BaseItem } from '~/base/base.entity';

@ObjectType()
export class User extends BaseItem {
  @Field({ description: "User's name" })
  name: string;

  @Field({ description: "User's email" })
  email: string;
}
