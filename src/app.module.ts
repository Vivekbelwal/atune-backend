import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
      sortSchema: true,
    }),
    // TODO: Change to env variable
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/atune'),
    UsersModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
