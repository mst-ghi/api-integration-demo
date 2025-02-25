import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseService } from '@app/database';
import { Processor, Process } from '@nestjs/bull';
import { IJobTransformed } from './providers.type';
import * as runtime from '@prisma/client/runtime/library.js';

type TX = Omit<PrismaClient, runtime.ITXClientDenyList>;

@Processor('jobs')
export class ProviderProcessor extends DatabaseService {
  private readonly logger = new Logger(ProviderProcessor.name);

  @Process()
  async transcode({ data }: Job<IJobTransformed>) {
    try {
      const job = await this.prisma.$transaction(async (tx) => {
        const company = await this.companyQuery(tx, { company: data.company });

        if (company) {
          const salary = await this.salaryQuery(tx, { salary: data.salary });
          const location = await this.locationQuery(tx, { location: data.location });
          const skills = await this.skillsQuery(tx, { skills: data.skills });

          const rawData = {
            code: data.job.code,
            company_id: company.id,
            salary_id: salary?.id,
            location_id: location?.id,
            provider: data.job.provider,
            title: data.job.title,
            type: data.job.type,
            experience: data.job.experience,
            remotely: data.job.remotely,
            posted_at: data.job.posted_at,
            skills: skills ? { connect: skills?.map((s) => ({ id: s.id })) } : undefined,
          };

          return tx.job.upsert({
            where: { code: data.job.code },
            create: rawData,
            update: rawData,
          });
        } else {
          this.logger.warn('Company not found');
        }
      });

      if (job) {
        this.logger.verbose(`Job processed successfully: ${data.job.code} ${job.id}`);
      }
    } catch (error) {
      this.logger.error(`Job processed failed: ${data.job.code}`);
    }
  }

  async companyQuery(tx: TX, data?: Pick<IJobTransformed, 'company'>) {
    if (!data || !data.company) return;
    return tx.company.upsert({
      where: { name: data.company.name },
      create: data.company,
      update: data.company,
    });
  }

  async salaryQuery(tx: TX, data?: Pick<IJobTransformed, 'salary'>) {
    if (!data || !data.salary) return;
    return tx.salary.create({
      data: data.salary,
    });
  }

  async locationQuery(tx: TX, data?: Pick<IJobTransformed, 'location'>) {
    if (!data || !data.location) return;
    const query = { city: data.location.city || '', state: data.location.state || '' };
    return tx.location.upsert({
      where: { city_state: query },
      create: query,
      update: query,
    });
  }

  async skillsQuery(tx: TX, data?: Pick<IJobTransformed, 'skills'>) {
    if (!data || !data.skills) return;

    const rowSkills: { id: string; name: string; created_at: Date }[] = [];

    for (let index = 0; index < data.skills.length; index++) {
      const name = data.skills[index];
      rowSkills.push(
        await tx.skill.upsert({
          where: { name },
          create: { name },
          update: { name },
        }),
      );
    }

    return rowSkills;
  }
}
