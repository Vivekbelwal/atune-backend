import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '~/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      // TODO: Use env variable
      secret: 'secret',
      signOptions: { expiresIn: '200s' },
    }),
  ],
  providers: [AuthService, AuthResolver],
  exports: [AuthResolver, AuthService],
})
export class AuthModule {}
