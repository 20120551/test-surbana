import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export class PrismaBaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  withExtensions() {
    const client = new PrismaClient();
    return client;
  }
}

export const PrismaService = 'PrismaService';
export type PrismaService = ReturnType<PrismaBaseService['withExtensions']>;
