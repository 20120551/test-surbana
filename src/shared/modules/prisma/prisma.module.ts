import { Module } from '@nestjs/common';
import { ConfigurablePrismaModuleClass } from '.';
import { PrismaBaseService, PrismaService } from './services';

@Module({
  providers: [
    {
      provide: PrismaService,
      useFactory: () => new PrismaBaseService().withExtensions(),
    },
  ],
  exports: [PrismaService],
})
export class PrismaModule extends ConfigurablePrismaModuleClass {}
