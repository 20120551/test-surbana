import { ICommand } from '@nestjs/cqrs';

export class AddSubLocationCommand implements ICommand {
  constructor(
    public parentLocationId: string,
    public building: string,
    public locationName: string,
    public locationNumber: string,
    public area: number,
  ) {}
}
