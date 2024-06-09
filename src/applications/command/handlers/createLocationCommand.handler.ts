import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ILocationRepository } from 'domain/repositories';
import { ILocationFactory } from 'domain/factories/interfaces';
import { LocationResponseDto } from 'applications/dto/response/locationResponse.dto';
import { ILogger } from 'shared/modules/log/interfaces';
import { CreateLocationCommand } from '../createLocation.command';

@CommandHandler(CreateLocationCommand)
export class CreateLocationCommandHandler
  implements ICommandHandler<CreateLocationCommand, LocationResponseDto>
{
  constructor(
    @Inject(ILocationRepository)
    private readonly locationRepository: ILocationRepository,
    @Inject(ILocationFactory)
    private readonly locationFactory: ILocationFactory,
    @Inject(ILogger)
    private readonly logger: ILogger,
  ) {
    logger.setContext(CreateLocationCommandHandler.name);
  }

  async execute(command: CreateLocationCommand): Promise<LocationResponseDto> {
    this.logger.info(`Handling execute command 'CreateLocationCommand'`);

    const locationEntity = this.locationFactory.create(command);

    const location = await this.locationRepository.create(locationEntity);

    this.logger.info(`Handled execute command 'CreateLocationCommand'`);
    return location;
  }
}
