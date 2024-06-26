import { ICommand } from '@nestjs/cqrs';

export class CreateLocationCommand implements ICommand {
  constructor(
    public building: string,
    public locationName: string,
    public locationNumber: string,
    public area: number,
  ) {}
}
