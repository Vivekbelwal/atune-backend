import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvUtil } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(Number(EnvUtil.getEnv('APP_PORT')));
}
bootstrap();
