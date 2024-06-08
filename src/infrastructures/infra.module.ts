import { Module } from '@nestjs/common';
import { FactoryModule } from 'domain/factories/factory.module';

@Module({
  imports: [FactoryModule],
})
export class InfraModule {}
