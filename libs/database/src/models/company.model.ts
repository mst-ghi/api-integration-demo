import { ApiProperty } from '@nestjs/swagger';

export class CompanyModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  website?: string;

  @ApiProperty()
  industry?: string;

  @ApiProperty()
  created_at: Date;
}
