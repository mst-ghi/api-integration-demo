import AppConfigs from './app.configs';

import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/database';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [AppConfigs],
    }),
    PrismaModule,
  ],
})
export class AppModule {}
