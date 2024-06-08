import { LocationEntity } from 'domain/entities';

export interface ILocationRepository {
  get(): Promise<LocationEntity[]>;
  getById(id: string): Promise<LocationEntity>;
  create(location: LocationEntity): Promise<LocationEntity>;
  update(location: LocationEntity): Promise<LocationEntity>;
  delete(location: LocationEntity): Promise<LocationEntity>;
}
