import { Module } from '@nestjs/common';
import { ILocationFactory } from './interfaces';
import { LocationFactory } from './services/location.factory';

@Module({
  providers: [
    {
      provide: ILocationFactory,
      useClass: LocationFactory,
    },
  ],
  exports: [ILocationFactory],
})
export class FactoryModule {}
