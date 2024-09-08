import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '~/user/user.schema';
import { SignUpResponse } from './auth.entity';
import { SignInUserInput, SignUpUserInput } from './auth.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignUpResponse)
  signUp(@Args('input') input: SignUpUserInput) {
    return this.authService.signUp(input);
  }

  @Mutation(() => SignUpResponse)
  signIn(@Args('input') input: SignInUserInput) {
    return this.authService.signIn(input);
  }
}
