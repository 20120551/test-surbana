import { ILocationFactory } from '../interfaces';
import { LocationEntity } from '../../entities';

export class LocationFactory implements ILocationFactory {
  create(): LocationEntity {
    throw new Error('Method not implemented.');
  }
}
