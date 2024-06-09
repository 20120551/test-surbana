import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateLocationCommand } from '../updateLocation.command';
import { LocationResponseDto } from 'applications/dto/response/locationResponse.dto';
import { ILocationRepository } from 'domain/repositories';
import { Inject, NotFoundException } from '@nestjs/common';
import { ILocationFactory } from 'domain/factories/interfaces';
import { ILogger } from 'shared/modules/log/interfaces';

@CommandHandler(UpdateLocationCommand)
export class UpdateLocationCommandHandler
  implements ICommandHandler<UpdateLocationCommand, LocationResponseDto>
{
  constructor(
    @Inject(ILocationRepository)
    private readonly locationRepository: ILocationRepository,
    @Inject(ILocationFactory)
    private readonly locationFactory: ILocationFactory,
    @Inject(ILogger)
    private readonly logger: ILogger,
  ) {
    logger.setContext(UpdateLocationCommandHandler.name);
  }

  async execute(command: UpdateLocationCommand): Promise<LocationResponseDto> {
    this.logger.info(`Handling execute command 'UpdateLocationCommand'`, {
      correlationId: command.id,
    });

    const isExist = await this.locationRepository.exist(command.id);

    if (!isExist) {
      throw new NotFoundException(`Not found location id ${command.id}`);
    }

    const locationEntity = this.locationFactory.create(command);
    const updatedLocation =
      await this.locationRepository.update(locationEntity);

    this.logger.info(`Handled execute command 'UpdateLocationCommand'`, {
      correlationId: command.id,
    });

    return updatedLocation;
  }
}
