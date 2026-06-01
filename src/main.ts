import { ValidationPipe } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';

import { NestExpressApplication }
from '@nestjs/platform-express';

import { SwaggerModule, DocumentBuilder }
from '@nestjs/swagger';

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

  const config = new DocumentBuilder()
    .setTitle('Coffee Backend API')
    .setDescription('Dokumentasi API lengkap untuk aplikasi Coffee Shop')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(3000);
}

bootstrap();