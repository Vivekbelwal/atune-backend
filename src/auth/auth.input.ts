import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignUpUserInput {
  @Field({ description: "User's name" })
  name: string;

  @Field({ description: "User's email" })
  email: string;

  @Field({ description: "User's password" })
  password: string;
}

@InputType()
export class SignInUserInput {
  @Field({ description: "User's email" })
  email: string;

  @Field({ description: "User's password" })
  password: string;
}
