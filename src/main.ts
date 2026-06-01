import { ValidationPipe } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';

import { NestExpressApplication }
from '@nestjs/platform-express';

import { AppModule } from './app.module';

import { join } from 'path';

import { mkdirSync } from 'fs';

async function bootstrap() {

  mkdirSync('./uploads/menu', { recursive: true });
  mkdirSync('./uploads/bukti', { recursive: true });

  const app =
    await NestFactory.create<NestExpressApplication>(
      AppModule,
    );

  app.enableCors();

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(3000);
}

bootstrap();