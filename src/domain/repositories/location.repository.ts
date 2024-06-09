import { LocationEntity } from 'domain/entities';

export const ILocationRepository = 'ILocationRepository';
export interface ILocationRepository {
  get(): Promise<LocationEntity[]>;
  getById(id: string): Promise<LocationEntity | null>;
  exist(id: string): Promise<boolean>;
  create(location: LocationEntity): Promise<LocationEntity>;
  update(location: LocationEntity): Promise<LocationEntity>;
  delete(location: LocationEntity): Promise<void>;
}
