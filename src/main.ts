import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvUtil } from './common';
import { graphqlUploadExpress } from 'graphql-upload-ts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Configure file upload middleware
  app.use('/graphql', graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

  await app.listen(Number(EnvUtil.getEnv('APP_PORT')));
}
bootstrap();
