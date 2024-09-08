import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '~/user/user.service';
import { SignUpResponse } from './auth.entity';
import { JwtService } from '@nestjs/jwt';
import { SignInUserInput, SignUpUserInput } from './auth.input';
import { validatePassword } from '~/common/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(input: SignUpUserInput): Promise<SignUpResponse> {
    const user = await this.userService.findOne({ email: input.email });
    if (user) {
      throw new ConflictException('User already exists');
    }
    const newUser = await this.userService.create(input);
    const token = this.jwtService.sign({ user: newUser });
    return { token, user: newUser };
  }

  async signIn(input: SignInUserInput): Promise<SignUpResponse> {
    const user = await this.userService.findOne({ email: input.email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await validatePassword(input.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const token = this.jwtService.sign({ user });
    return { token, user };
  }
}
