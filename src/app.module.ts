import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { EnvUtil } from './common';
import { GraphQLUpload } from 'graphql-upload-ts';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
      sortSchema: true,
      csrfPrevention: false, // Disable CSRF protection for file uploads
      introspection: true,
      context: ({ req, res }) => ({ req, res }),
      resolvers: {
        Upload: GraphQLUpload,
      },
    }),
    MongooseModule.forRoot(EnvUtil.getEnv('MONGODB_URI')),
    AuthModule,
    UserModule,
    FileModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
