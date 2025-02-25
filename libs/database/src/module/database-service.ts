import { PrismaService } from '../prisma';
import { ConfigService } from '@nestjs/config';
import { Global, Inject, Injectable } from '@nestjs/common';

@Global()
@Injectable()
export class DatabaseService {
  @Inject(ConfigService)
  protected configs: ConfigService;

  @Inject(PrismaService)
  protected prisma: PrismaService;
}
