import { Module } from '@nestjs/common';
import { InfraModule } from 'infrastructures/infra.module';
import { FactoryModule } from 'domain/factories/factory.module';
import { CreateLocationCommandHandler } from './command/handlers/createLocationCommand.handler';
import { UpdateLocationCommandHandler } from './command/handlers/updateLocationCommand.handler';
import { DeleteLocationCommandHandler } from './command/handlers/deleteLocationCommand.handler';
import { GetLocationDetailQueryHandler } from './query/handlers/getLocationDetailQuery.handler';
import { GetLocationQueryHandler } from './query/handlers/getLocationQuery.handler';
import { AddSubLocationCommandHandler } from './command/handlers/addSubLocationCommand.handler';

@Module({
  imports: [InfraModule, FactoryModule],
  providers: [
    CreateLocationCommandHandler,
    UpdateLocationCommandHandler,
    DeleteLocationCommandHandler,
    AddSubLocationCommandHandler,
    GetLocationQueryHandler,
    GetLocationDetailQueryHandler,
  ],
})
export class ApplicationModule {}
