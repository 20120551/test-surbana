import { ApiProperty } from '@nestjs/swagger';

export class LocationResponseDto {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  locationName: string;

  @ApiProperty({
    type: String,
  })
  locationNumber: string;

  @ApiProperty({
    type: Number,
  })
  area: number;

  @ApiProperty({
    type: String,
    isArray: true,
  })
  parentIds: string[];
}

export class LocationResponseDetailDto extends LocationResponseDto {
  @ApiProperty({
    type: LocationResponseDto,
    isArray: true,
  })
  subLocations: LocationResponseDto[];
}
