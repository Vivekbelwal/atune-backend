import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from './file.schema';
import { FileResolver } from './file.resolver';
import { FileService } from './file.service';
import { AuthGuard } from '~/auth/auth.guard';
import { UserModule } from '~/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
    forwardRef(() => UserModule),
  ],
  providers: [FileService, FileResolver, AuthGuard],
  exports: [FileResolver, FileService],
})
export class FileModule {}
