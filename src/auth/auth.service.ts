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
import { EnvUtil } from '~/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(input: SignUpUserInput) {
    const user = await this.userService.findOne({ email: input.email });
    if (user) {
      throw new ConflictException('User already exists');
    }
    const newUser = await this.userService.create(input);
    const token = this.jwtService.sign({ user: newUser }, { secret: EnvUtil.getEnv('JWT_SECRET') });

    return { token, user: newUser };
  }

  async signIn(input: SignInUserInput) {
    const user = await this.userService.findOne({ email: input.email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = validatePassword(input.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const token = this.jwtService.sign({ user }, { secret: EnvUtil.getEnv('JWT_SECRET') });

    return { token, user: user };
  }
}
