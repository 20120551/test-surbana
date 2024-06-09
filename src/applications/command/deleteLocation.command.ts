import { ICommand } from '@nestjs/cqrs';

export class DeleteLocationCommand implements ICommand {
  constructor(public id: string) {}
}
