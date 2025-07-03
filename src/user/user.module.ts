import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { AuthGuard } from '~/auth/auth.guard';
import { FileModule } from '~/file/file.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), FileModule],
  providers: [UserService, UserResolver, AuthGuard],
  exports: [UserResolver, UserService],
})
export class UserModule {}
