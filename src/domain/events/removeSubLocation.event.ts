import { IEvent } from '@nestjs/cqrs';

export class RemoveSubLocationEvent implements IEvent {
  constructor(public id: string) {}
}
