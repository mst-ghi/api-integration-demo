import { ApiSignature } from '@app/toolkit';
import { Controller, Param, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JobsService } from './jobs.service';
import { JobResponse, JobsResponse } from './jobs.responses';

@ApiTags('Job Offers')
@Controller('job-offers')
export class JobsController {
  constructor(private readonly service: JobsService) {}

  @ApiSignature({
    method: 'GET',
    path: '/',
    summary: 'Get list of jobs',
    isPagination: true,
  })
  @ApiQuery({ name: 'search', description: 'job title', required: false })
  @ApiQuery({ name: 'city', description: 'city', required: false })
  @ApiQuery({ name: 'state', description: 'state', required: false })
  @ApiQuery({ name: 'min', description: 'min salary', required: false, type: 'number' })
  @ApiQuery({ name: 'max', description: 'min salary', required: false, type: 'number' })
  @ApiResponse({ status: 200, type: JobsResponse })
  async list(
    @Query('page') page: string,
    @Query('take') take: string,
    @Query('search') search: string,
    @Query('city') city: string,
    @Query('state') state: string,
    @Query('min') min: string,
    @Query('max') max: string,
  ): Promise<JobsResponse> {
    const { data, meta } = await this.service.list({ page, take, search, city, state, min, max });
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
