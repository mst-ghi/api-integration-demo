import { Queue } from 'bull';
import { HttpService } from '@nestjs/axios';
import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { IJobProviderTwo, IJobTransformed, ProviderContract } from './providers.type';

@Injectable()
export class ProviderTwoService implements ProviderContract {
  private readonly logger = new Logger(ProviderTwoService.name);

  constructor(
    @InjectQueue('jobs') private queue: Queue,
    private readonly http: HttpService,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS, {
    name: 'provider-two',
  })
  async handler() {
    const jobs = await this.fetcher();
    for (let idx = 0; idx < jobs.length; idx++) {
      const job = this.parser(jobs[idx].job, jobs[idx].jobId);
      this.queue.add(job);
    }
  }

  async fetcher(): Promise<{ jobId: string; job: IJobProviderTwo }[]> {
    let result: { jobId: string; job: IJobProviderTwo }[] = [];

    const url = 'https://assignment.devotel.io/api/provider2/jobs';

    try {
      const { data } = await this.http.axiosRef.get(url);
      const jobsList = data.data.jobsList;
      const jobIds = Object.keys(jobsList);

      for (let idx = 0; idx < jobIds.length; idx++) {
        const jobId = jobIds[idx];
        result.push({ jobId, job: jobsList[jobId] });
      }
    } catch (error) {
      this.logger.error(error.message);
      result = [];
    }

    return result;
  }
  parser(job: IJobProviderTwo, jobId): IJobTransformed {
    return {
      skills: job.requirements.technologies,
      job: {
        provider: 'provider-two',
        code: jobId,
        title: job.position,
        type: 'full-time',
        experience: job.requirements.experience,
        posted_at: job.postedDate,
      },
      company: this.parseCompany(job.employer),
      location: this.parseLocation(job.location),
      salary: this.parseSalaryRange(job.compensation),
    };
  }

  parseCompany(company: { companyName: string; website: string }) {
    if (!company.companyName) return undefined;

    return {
      name: company.companyName,
      website: company.website,
    };
  }

  parseLocation(location: { city: string; state: string; remote: boolean }) {
    if (!location) return undefined;
    return { city: location.city || '', state: location.state || '' };
  }

  parseSalaryRange(salary: { min: number; max: number; currency: string }) {
    if (!salary) return undefined;
    return salary;
  }
}
