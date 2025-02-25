import AppConfigs from './app.configs';

import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { PrismaModule } from '@app/database';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { JobsModule } from './jobs/jobs.module';
import { ProvidersModule } from './providers/providers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [AppConfigs],
    }),
    BullModule.forRoot({
      redis: AppConfigs().redis,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    JobsModule,
    ProvidersModule,
  ],
})
export class AppModule {}
