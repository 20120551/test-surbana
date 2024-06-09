import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateLocationDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  building: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  locationName: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  locationNumber: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  area: number;
}
