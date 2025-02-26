import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, VersioningType } from '@nestjs/common';
import { SwaggerStarter, UseGlobalFilters } from '@app/toolkit';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configs = app.get(ConfigService);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix('api');

  SwaggerStarter.register(app);
  UseGlobalFilters.use(app, process.env.NODE_ENV != 'development');

  await app.listen(configs.get('app.port') ?? 3000, '0.0.0.0', () => {
    Logger.log(`Application is running on ${configs.get('app.port')}`, 'NestApplication');
  });
}
bootstrap();
