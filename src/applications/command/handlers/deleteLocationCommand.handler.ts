import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LocationResponseDto } from 'applications/dto/response/locationResponse.dto';
import { ILocationRepository } from 'domain/repositories';
import { ILogger } from 'shared/modules/log/interfaces';
import { NotFoundException } from 'shared/exceptions';
import { DeleteLocationCommand } from '../deleteLocation.command';
import { ILocationFactory } from 'domain/factories/interfaces';

@CommandHandler(DeleteLocationCommand)
export class DeleteLocationCommandHandler
  implements ICommandHandler<DeleteLocationCommand, void>
{
  constructor(
    @Inject(ILocationRepository)
    private readonly locationRepository: ILocationRepository,
    @Inject(ILocationFactory)
    private readonly locationFactory: ILocationFactory,
    @Inject(ILogger)
    private readonly logger: ILogger,
  ) {
    logger.setContext(DeleteLocationCommandHandler.name);
  }

  async execute(command: DeleteLocationCommand): Promise<void> {
    this.logger.info(`Handling execute command 'DeleteLocationCommand'`, {
      correlationId: command.id,
    });

    const isExist = await this.locationRepository.exist(command.id);

    if (!isExist) {
      throw new NotFoundException(`Not found location id ${command.id}`);
    }

    const locationEntity = this.locationFactory.create(command);
    await this.locationRepository.delete(locationEntity);

    this.logger.info(`Handled execute command 'DeleteLocationCommand'`, {
      correlationId: command.id,
    });
  }
}
