import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ILocationRepository } from 'domain/repositories';
import { ILogger } from 'shared/modules/log/interfaces';
import { GetLocationQuery } from '../getLocation.query';
import { LocationResponseDetailDto } from 'applications/dto/response/locationResponse.dto';

@QueryHandler(GetLocationQuery)
export class GetLocationQueryHandler
  implements IQueryHandler<GetLocationQuery, LocationResponseDetailDto[]>
{
  constructor(
    @Inject(ILocationRepository)
    private readonly locationRepository: ILocationRepository,
    @Inject(ILogger)
    private readonly logger: ILogger,
  ) {
    logger.setContext(GetLocationQueryHandler.name);
  }

  async execute(query: GetLocationQuery): Promise<LocationResponseDetailDto[]> {
    this.logger.info(`Handling execute query 'GetLocationQuery'`);

    const location = await this.locationRepository.get();

    this.logger.info(`handled execute query 'GetLocationQuery'`);

    return location;
  }
}
