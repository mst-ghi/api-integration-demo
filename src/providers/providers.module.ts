import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { HttpModule } from '@nestjs/axios';

import { ProviderOneService } from './provider-one.service';
import { ProviderTwoService } from './provider-two.service';
import { ProviderProcessor } from './providers.processor';

@Module({
  imports: [HttpModule.register({ timeout: 10000 }), BullModule.registerQueue({ name: 'jobs' })],
  providers: [ProviderOneService, ProviderTwoService, ProviderProcessor],
})
export class ProvidersModule {}
