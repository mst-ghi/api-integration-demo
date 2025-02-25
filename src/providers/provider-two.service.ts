import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ProviderTwoService {
  private readonly logger = new Logger(ProviderTwoService.name);

  // @Cron(CronExpression.EVERY_30_SECONDS, {
  //   name: 'provider-two',
  // })
  handler() {
    this.logger.debug('Jobs provider two');
  }
}
