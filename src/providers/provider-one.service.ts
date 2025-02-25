import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { ProviderBase } from './provider-base.service';
import { IJobProviderOne, IJobTransformed, ProviderContract } from './providers.type';

@Injectable()
export class ProviderOneService extends ProviderBase implements ProviderContract {
  private readonly logger = new Logger(ProviderOneService.name);

  @Cron(process.env.PROVIDER_ONE_RUN_TIME || CronExpression.EVERY_30_SECONDS, {
    name: 'provider-one',
    disabled: process.env.PROVIDER_ONE_RUN_STATUS !== 'on',
  })
  async handler() {
    const jobs = await this.fetcher();
    for (let idx = 0; idx < jobs.length; idx++) {
      const job = this.parser(jobs[idx]);
      this.queue.add(job, { delay: 1_000 + idx * 500 });
    }
  }

  async fetcher(): Promise<IJobProviderOne[]> {
    const url = 'https://assignment.devotel.io/api/provider1/jobs';
    try {
      const { data } = await this.http.axiosRef.get(url);
      return data.jobs as IJobProviderOne[];
    } catch (error) {
      this.logger.error(error.message);
      return [];
    }
  }

  parser(job: IJobProviderOne): IJobTransformed {
    return {
      job: {
        provider: 'provider-one',
        code: job.jobId,
        title: job.title,
        type: job.details.type,
        posted_at: job.postedDate,
      },
      skills: job.skills || [],
      company: this.parseCompany(job.company),
      location: this.parseLocation(job.details.location),
      salary: this.parseSalaryRange(job.details.salaryRange),
    };
  }

  parseCompany(company: { name: string; industry: string }) {
    if (!company.name) return undefined;

    return {
      name: company.name,
      industry: company.industry,
    };
  }

  parseLocation(location: string) {
    if (!location) return undefined;

    const [city, state] = location.split(',').map((s) => s.trim());

    return { city: city || '', state: state || '' };
  }

  parseSalaryRange(salary: string) {
    if (!salary) return undefined;

    const currencyMatch = salary.match(/^(\$|€|£|¥|USD|EUR|GBP|JPY)/);
    const currency = currencyMatch ? currencyMatch[0] : null;

    const [minStr, maxStr] = salary.split(' - ').map((s) => s.trim());

    function convertToNumber(value) {
      if (!value) return null;
      let num = parseFloat(value.replace(/[^0-9.]/g, ''));
      if (value.includes('k')) num *= 1000;
      if (value.includes('m')) num *= 1000000;
      return Math.round(num);
    }

    return {
      min: convertToNumber(minStr),
      max: convertToNumber(maxStr),
      currency,
    };
  }
}
