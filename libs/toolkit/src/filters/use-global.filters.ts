import { NestExpressApplication } from '@nestjs/platform-express';
import { InternalExceptionFilter } from './internal-exception.filter';

export class UseGlobalFilters {
  static use(app: NestExpressApplication, withInternalFilter = true) {
    if (withInternalFilter) {
      app.useGlobalFilters(new InternalExceptionFilter());
    }
  }
}
