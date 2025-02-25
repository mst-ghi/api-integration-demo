import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { SwaggerStarter } from '@app/toolkit';
import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configs = app.get(ConfigService);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix('api');

  SwaggerStarter.register(app);

  await app.listen(configs.get('app.port') ?? 3000, '0.0.0.0', () => {
    Logger.log(`Application is running on ${configs.get('app.port')}`, 'NestApplication');
  });
}
bootstrap();
