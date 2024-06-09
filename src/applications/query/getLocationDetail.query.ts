import { IQuery } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetLocationDetailQuery implements IQuery {
  @ApiProperty({
    type: String,
  })
  @IsString()
  public id: string;

  constructor(id: string) {
    this.id = id;
  }
}
