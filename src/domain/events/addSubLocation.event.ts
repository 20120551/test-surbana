import { IEvent } from '@nestjs/cqrs';

export class AddSubLocationEvent implements IEvent {
  constructor(
    public id: string,
    public building: string,
    public locationName: string,
    public locationNumber: string,
    public area: number,
  ) {}
}
