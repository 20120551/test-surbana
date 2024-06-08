import { LocationEntity } from '../../entities/location.entity';

export const ILocationFactory = 'ILocationFactory';
export interface ILocationFactory {
  create(): LocationEntity;
}
