import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '~/user/user.entity';

@ObjectType()
export class SignUpResponse {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}
