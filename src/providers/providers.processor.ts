import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { Processor, Process } from '@nestjs/bull';
import { IJobProviderOneTransformed } from './providers.type';

@Processor('jobs')
export class ProviderProcessor {
  private readonly logger = new Logger(ProviderProcessor.name);

  @Process()
  transcode(job: Job<IJobProviderOneTransformed>) {
    console.log('consumer', job.data);
  }
}
