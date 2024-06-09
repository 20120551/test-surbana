import { AggregateRoot } from '@nestjs/cqrs';
import { AddSubLocationEvent } from 'domain/events';
import { RemoveSubLocationEvent } from 'domain/events/removeSubLocation.event';

export class LocationEntity extends AggregateRoot {
  id: string;
  building: string;
  locationName: string;
  locationNumber: string;
  area: number;
  parentIds: string[] = [];
  subLocations: LocationEntity[] = [];

  constructor(
    building: string,
    locationName: string,
    locationNumber: string,
    area: number,
    parentIds: string[],
  ) {
    super();
    this.building = building;
    this.locationName = locationName;
    this.locationNumber = locationNumber;
    this.area = area;
    this.parentIds = parentIds;
  }

  public addLocation(payload: LocationEntity) {
    this.subLocations.push(payload);
    // apply "AddSubLocationEvent"
    this.apply(
      new AddSubLocationEvent(
        payload.id,
        payload.building,
        payload.locationName,
        payload.locationNumber,
        payload.area,
      ),
    );
  }

  public removeLocation(id: string) {
    const locationIndex = this.subLocations.findIndex(
      (location) => location.id === id,
    );

    if (locationIndex === -1) {
      throw new Error(`Not found location to delete`);
    }

    this.subLocations.splice(locationIndex, 1);
    // apply "RemoveSubLocationEvent"
    this.apply(new RemoveSubLocationEvent(id));
  }
}
