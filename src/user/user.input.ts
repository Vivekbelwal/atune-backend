import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field({ description: "User's name", nullable: true })
  name?: string;

  @Field({ description: "User's avatar file ID", nullable: true })
  avatarId?: string;
}
