import { Inject } from '@nestjs/common';
import { Location } from '@prisma/client';
import isEmpty from 'lodash/isEmpty';
import { LocationEntity } from 'domain/entities';
import { ILocationRepository } from 'domain/repositories';
import { PrismaService } from 'shared/modules/prisma/services';
import { ILocationFactory } from 'domain/factories/interfaces';
import { ILogger } from 'shared/modules/log/interfaces';

export class LocationRepository implements ILocationRepository {
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
    @Inject(ILocationFactory)
    private readonly locationFactory: ILocationFactory,
    @Inject(ILogger)
    private readonly logger: ILogger,
  ) {
    logger.setContext(LocationRepository.name);
  }

  async get(): Promise<LocationEntity[]> {
    const locations = await this.prismaService.location.findMany();

    if (isEmpty(locations)) {
      this.logger.info('Empty location');
      return [];
    }

    const { groupLocationByLength } =
      this.deserializeAndGroupByLength(locations);

    console.info('Get location success');
    return this.aggregateLocation(groupLocationByLength, 0);
  }

  async exist(id: string): Promise<boolean> {
    const location = await this.prismaService.location.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    if (!location) {
      this.logger.info('Location not existed', { correlationId: id });
      return false;
    }

    this.logger.info('Location existed', { correlationId: id });
    return true;
  }

  async getById(id: string): Promise<LocationEntity | null> {
    const locations = await this.prismaService.location.findMany({
      where: {
        OR: [
          {
            id,
          },
          {
            parentIds: {
              array_contains: id,
            },
          },
        ],
      },
    });

    if (isEmpty(locations)) {
      this.logger.info('Not found location', { correlationId: id });
      return null;
    }

    const { deserializeLocation, groupLocationByLength } =
      this.deserializeAndGroupByLength(locations);

    const parentLocation = deserializeLocation.find(
      (location) => location.id === id,
    );

    const [locationResponse] = this.aggregateLocation(
      groupLocationByLength,
      parentLocation.parentIds.length,
    );

    const entity = this.locationFactory.create(locationResponse);
    this.logger.info('Get location success', { correlationId: id });
    return entity;
  }

  async create(location: LocationEntity): Promise<LocationEntity> {
    const createdLocation = await this.prismaService.location.create({
      data: {
        building: location.building,
        locationName: location.locationName,
        locationNumber: location.locationNumber,
        area: location.area,
        parentIds: location.parentIds,
      },
    });

    const entity = this.locationFactory.create({
      ...createdLocation,
      parentIds: createdLocation.parentIds as string[],
    });

    this.logger.info('Create location success', {
      correlationId: createdLocation.id,
    });
    return entity;
  }

  async update(location: LocationEntity): Promise<LocationEntity> {
    const updatedLocation = await this.prismaService.location.update({
      where: {
        id: location.id,
      },
      data: {
        building: location.building,
        locationName: location.locationName,
        locationNumber: location.locationNumber,
        area: location.area,
      },
    });

    const entity = this.locationFactory.create({
      ...updatedLocation,
      parentIds: updatedLocation.parentIds as string[],
    });

    this.logger.info('Update location success', { correlationId: location.id });
    return entity;
  }

  async delete(location: LocationEntity): Promise<void> {
    const deletedLocations = await this.prismaService.location.deleteMany({
      where: {
        OR: [
          {
            id: location.id,
          },
          {
            parentIds: {
              array_contains: location.id,
            },
          },
        ],
      },
    });

    this.logger.info(`Delete success location response ${deletedLocations}`, {
      correlationId: location.id,
    });
  }

  private deserializeAndGroupByLength(locations: Location[]) {
    const deserializeLocation = locations.map((location) => ({
      ...location,
      parentIds: location.parentIds as string[],
    }));

    const groupLocationByLength = deserializeLocation.reduce(
      (curr, location) => {
        const key = location.parentIds.length;
        if (curr.has(key)) {
          const locations = curr.get(key);
          curr.set(key, [...locations, location]);

          return curr;
        }

        curr.set(key, [location]);
        return curr;
      },
      new Map<number, Location[]>(),
    );

    return {
      deserializeLocation,
      groupLocationByLength,
    };
  }

  private aggregateLocation = (
    group: Map<number, Location[]>,
    key: number,
    parentId: string = '',
  ) => {
    if (!group.has(key)) {
      return [];
    }

    // get all location at level 'key'
    const locations = [...group.get(key)];

    // filter actually subCollection of parentId passed via params
    const actualSubLocations = locations.filter((location) => {
      if (parentId) {
        return (location.parentIds as string[]).includes(parentId);
      }

      return location;
    });

    // recursive to retrive all the subLocations
    return actualSubLocations.map((location) => {
      const subLocations = this.aggregateLocation(group, key + 1, location.id);

      return {
        ...location,
        subLocations,
      };
    });
  };
}
