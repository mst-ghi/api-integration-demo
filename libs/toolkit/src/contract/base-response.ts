import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse {
  @ApiProperty({ example: 200 })
  status?: number;

  @ApiProperty()
  message?: string;
}

export class PaginationMetaResponse {
  @ApiProperty()
  total_docs: number;

  @ApiProperty()
  take: number;

  @ApiProperty()
  total_pages: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  has_prev_page: boolean;

  @ApiProperty()
  has_next_page: boolean;

  @ApiProperty()
  prev: number;

  @ApiProperty()
  next: number;
}
