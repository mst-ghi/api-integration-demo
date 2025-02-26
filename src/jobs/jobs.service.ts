import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@app/database';
import { throwNotFound } from '@app/toolkit';

interface IListProps {
  page?: string;
  take?: string;
  search?: string;
  min?: string;
  max?: string;
  city?: string;
  state?: string;
}

@Injectable()
export class JobsService extends DatabaseService {
  async list(props: IListProps) {
    const query = this.generateListQuery(props);
    return this.prisma.paginate('job', { page: props.page, take: props.take }, query);
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

  generateListQuery({ search, city, state, min, max }: IListProps) {
    const query: any = {
      where: {},
      orderBy: { posted_at: 'desc' },
      include: {
        company: true,
        skills: true,
        location: true,
        salary: true,
      },
    };

    if (search) {
      query.where['OR'] = [{ title: { contains: search } }];
    }

    if (min) {
      query.where['OR'] = [{ salary: { min: { gte: Number(min) } } }];
    }

    if (max) {
      query.where['OR'] = [{ salary: { max: { lte: Number(max) } } }];
    }

    if (city) {
      query.where['OR'] = [{ location: { city } }];
    }

    if (state) {
      query.where['OR'] = [{ location: { state } }];
    }

    return query;
  }
}
