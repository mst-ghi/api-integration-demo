import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@app/database';
import { throwNotFound } from '@app/toolkit';

@Injectable()
export class JobsService extends DatabaseService {
  async list({ page, take }: { page?: string; take?: string }) {
    const query: any = {
      orderBy: { posted_at: 'desc' },
      include: {
        company: true,
        skills: true,
        location: true,
        salary: true,
      },
    };

    return this.prisma.paginate('job', { page, take }, query);
  }

  async show(jobId: string) {
    const job = await this.prisma.job.findFirst({
      where: { id: jobId },
      include: {
        company: true,
        skills: true,
        location: true,
        salary: true,
      },
    });

    if (!job) {
      throwNotFound('Job not found!');
    }

    return job;
  }
}
