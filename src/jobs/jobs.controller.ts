import { ApiSignature } from '@app/toolkit';
import { Controller, Param, Query } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JobsService } from './jobs.service';
import { JobResponse, JobsResponse } from './jobs.responses';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly service: JobsService) {}

  @ApiSignature({
    method: 'GET',
    path: '/',
    summary: 'Get list of jobs',
    isPagination: true,
  })
  @ApiResponse({ status: 200, type: JobsResponse })
  async list(@Query('page') page: string, @Query('take') take: string): Promise<JobsResponse> {
    const { data, meta } = await this.service.list({ page, take });
    return { jobs: data, meta };
  }

  @ApiSignature({
    method: 'GET',
    path: '/:id',
    summary: 'get job data by jobId',
  })
  @ApiParam({ name: 'id', description: 'job id' })
  @ApiResponse({ status: 200, type: JobResponse })
  async show(@Param('id') jobId: string): Promise<JobResponse> {
    return {
      job: await this.service.show(jobId),
    };
  }
}
