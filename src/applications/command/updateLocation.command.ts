import { ICommand } from '@nestjs/cqrs';

export class UpdateLocationCommand implements ICommand {
  constructor(
    public id: string,
    public building: string,
    public locationName: string,
    public locationNumber: string,
    public area: number,
  ) {}
}
