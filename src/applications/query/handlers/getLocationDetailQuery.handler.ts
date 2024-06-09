import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ILocationRepository } from 'domain/repositories';
import { NotFoundException } from 'shared/exceptions';
import { ILogger } from 'shared/modules/log/interfaces';
import { LocationResponseDetailDto } from 'applications/dto/response/locationResponse.dto';
import { GetLocationDetailQuery } from '../getLocationDetail.query';

@QueryHandler(GetLocationDetailQuery)
export class GetLocationDetailQueryHandler
  implements IQueryHandler<GetLocationDetailQuery, LocationResponseDetailDto>
{
  constructor(
    @Inject(ILocationRepository)
    private readonly locationRepository: ILocationRepository,
    @Inject(ILogger)
    private readonly logger: ILogger,
  ) {
    logger.setContext(GetLocationDetailQueryHandler.name);
  }

  async execute(
    query: GetLocationDetailQuery,
  ): Promise<LocationResponseDetailDto> {
    this.logger.info(`Handling execute query 'GetLocationDetailQuery'`, {
      correlationId: query.id,
    });

    const location = await this.locationRepository.getById(query.id);
    if (!location) {
      throw new NotFoundException(`Not found location id ${query.id}`);
    }

    this.logger.info(`handled execute query 'GetLocationDetailQuery'`, {
      correlationId: query.id,
    });

    return location;
  }
}
