import { LocationEntity } from '../../entities/location.entity';

export const ILocationFactory = 'ILocationFactory';
export interface ILocationFactory {
  create(args: Partial<LocationEntity>): LocationEntity;
  create(
    building: string,
    locationName: string,
    locationNumber: string,
    area: number,
    parentIds: string[],
  ): LocationEntity;
}
