import { ILocationFactory } from '../interfaces';
import { LocationEntity } from '../../entities';
import { plainToInstance } from 'class-transformer';

export class LocationFactory implements ILocationFactory {
  create(args: Partial<LocationEntity>): LocationEntity;
  create(
    building: string,
    locationName: string,
    locationNumber: string,
    area: number,
  ): LocationEntity;
  create(
    building: unknown,
    locationName?: string,
    locationNumber?: string,
    area?: number,
    parentIds?: string[],
  ): LocationEntity {
    if (typeof building === 'string') {
      return new LocationEntity(
        building,
        locationName,
        locationNumber,
        area,
        parentIds,
      );
    }

    return plainToInstance(LocationEntity, building);
  }
}
