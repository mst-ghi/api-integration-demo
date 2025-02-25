import { Queue } from 'bull';
import { Inject } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

export abstract class ProviderBase {
  @Inject(ConfigService)
  protected configs: ConfigService;

  @Inject(HttpService)
  protected http: HttpService;

  @InjectQueue('jobs') protected queue: Queue;
}
