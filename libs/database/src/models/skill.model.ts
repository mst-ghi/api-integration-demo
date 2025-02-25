import { ApiProperty } from '@nestjs/swagger';

export class SkillModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  created_at: Date;
}
