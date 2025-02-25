import { JobModel } from '@app/database';
import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse, PaginationMetaResponse } from '@app/toolkit/contract';

export class JobsResponse extends BaseResponse {
  @ApiProperty({ type: () => [JobModel] })
  jobs: any;

  @ApiProperty({ type: PaginationMetaResponse })
  meta: any;
}

export class JobResponse extends BaseResponse {
  @ApiProperty({ type: () => JobModel })
  job: any;
}
