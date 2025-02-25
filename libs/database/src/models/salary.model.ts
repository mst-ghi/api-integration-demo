import { ApiProperty } from '@nestjs/swagger';

export class SalaryModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  min: number;

  @ApiProperty()
  max: number;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  created_at: Date;
}
