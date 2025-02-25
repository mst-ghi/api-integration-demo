import { ApiProperty } from '@nestjs/swagger';

import { CompanyModel } from './company.model';
import { SalaryModel } from './salary.model';
import { LocationModel } from './location.model';
import { SkillModel } from './skill.model';

export class JobModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  company_id: string;

  @ApiProperty({ required: false })
  salary_id?: string;

  @ApiProperty({ required: false })
  location_id?: string;

  @ApiProperty()
  provider: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  type: string;

  @ApiProperty({ required: false })
  experience: number;

  @ApiProperty({ required: false })
  remotely: boolean;

  @ApiProperty()
  posted_at: Date;

  @ApiProperty()
  created_at: Date;

  @ApiProperty({ type: () => [SkillModel], required: false })
  skills?: SkillModel[];

  @ApiProperty({ type: () => CompanyModel, required: false })
  company?: CompanyModel;

  @ApiProperty({ type: () => SalaryModel, required: false })
  salary?: SalaryModel;

  @ApiProperty({ type: () => LocationModel, required: false })
  location?: LocationModel;
}
