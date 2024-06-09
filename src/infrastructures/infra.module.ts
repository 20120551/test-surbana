import { Module } from '@nestjs/common';
import { FactoryModule } from 'domain/factories/factory.module';
import { ILocationRepository } from 'domain/repositories';
import { PrismaModule } from 'shared/modules/prisma/prisma.module';
import { LocationRepository } from './repositories/location.repository';

@Module({
  imports: [FactoryModule, PrismaModule],
  providers: [
    {
      provide: ILocationRepository,
      useClass: LocationRepository,
    },
  ],
  exports: [ILocationRepository],
})
export class InfraModule {}
