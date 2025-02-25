import { ApiProperty } from '@nestjs/swagger';

export class LocationModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  created_at: Date;
}
