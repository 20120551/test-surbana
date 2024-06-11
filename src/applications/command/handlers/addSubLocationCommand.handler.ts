import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ILocationRepository } from 'domain/repositories';
import { ILocationFactory } from 'domain/factories/interfaces';
import { LocationResponseDetailDto } from 'applications/dto/response/locationResponse.dto';
import { ILogger } from 'shared/modules/log/interfaces';
import { AddSubLocationCommand } from '../addSubLocation.command';
import { NotFoundException } from 'shared/exceptions';

@CommandHandler(AddSubLocationCommand)
export class AddSubLocationCommandHandler
  implements ICommandHandler<AddSubLocationCommand, LocationResponseDetailDto>
{
  constructor(
    @Inject(ILocationRepository)
    private readonly locationRepository: ILocationRepository,
    @Inject(ILocationFactory)
    private readonly locationFactory: ILocationFactory,
    @Inject(ILogger)
    private readonly logger: ILogger,
  ) {
    logger.setContext(AddSubLocationCommandHandler.name);
  }

  async execute(
    command: AddSubLocationCommand,
  ): Promise<LocationResponseDetailDto> {
    this.logger.info(`Handling execute command 'AddSubLocationCommand'`, {
      correlationId: command.parentLocationId,
    });

    const { parentLocationId, building, locationName, locationNumber, area } =
      command;
    const parentLocation =
      await this.locationRepository.getById(parentLocationId);

    if (!parentLocation) {
      throw new NotFoundException(
        `Not found parent location id ${parentLocationId}`,
      );
    }

    const parentIds = [...parentLocation.parentIds, parentLocation.id];
    const locationEntity = this.locationFactory.create(
      building,
      locationName,
      locationNumber,
      area,
      parentIds,
    );

    const location = await this.locationRepository.create(locationEntity);

    this.logger.info(`Handled execute command 'AddSubLocationCommand'`, {
      correlationId: command.parentLocationId,
    });

    parentLocation.addLocation(location);
    return parentLocation;
  }
}
