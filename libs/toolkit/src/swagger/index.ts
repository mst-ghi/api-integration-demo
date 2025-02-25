import { readFileSync } from 'fs';
import { CustomCss } from './swagger.css';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

export enum SwaggerRunStatusEnum {
  On = 'on',
  Off = 'off',
}

export class SwaggerStarter {
  static register(app: any, path = 'docs', baseUrl?: string, options?: SwaggerDocumentOptions) {
    if (process.env.SWAGGER_RUN_STATUS === SwaggerRunStatusEnum.On) {
      const config = new DocumentBuilder();

      if (baseUrl) {
        config.setDescription(`BaseURL: <strong>${baseUrl}</strong>`).addServer(baseUrl);
      }

      config.setTitle(`Jobs APIs`).setVersion('1.0');

      const document = SwaggerModule.createDocument(app, config.build(), options);

      let customCss;

      try {
        customCss = readFileSync('swagger.css', 'utf8');
      } catch (error) {
        customCss = CustomCss;
      }

      SwaggerModule.setup(path, app, document, {
        customCss,
        swaggerOptions: {
          docExpansion: 'none',
          layout: 'StandaloneLayout',
        },
      });
    }
  }
}
