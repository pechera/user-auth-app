import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

import cors from 'cors';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  app.enableShutdownHooks();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
      stopAtFirstError: true,
      validateCustomDecorators: true
    })
  );

  app.enableCors({
    origin: '*',
    methods: 'POST'
  });

  await app.listen(port, () => {
    logger.log(`Application running at ${port} port`);
  });
}

bootstrap();
