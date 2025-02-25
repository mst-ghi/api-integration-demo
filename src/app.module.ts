import AppConfigs from './app.configs';

import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseServiceModule, PrismaModule } from '@app/database';

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
    DatabaseServiceModule,
    JobsModule,
    ProvidersModule,
  ],
})
export class AppModule {}
