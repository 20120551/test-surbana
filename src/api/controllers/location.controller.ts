import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddSubLocationCommand } from 'applications/command/addSubLocation.command';
import { CreateLocationCommand } from 'applications/command/createLocation.command';
import { DeleteLocationCommand } from 'applications/command/deleteLocation.command';
import { UpdateLocationCommand } from 'applications/command/updateLocation.command';
import { CreateLocationDto } from 'applications/dto/request/createLocation.dto';
import { UpdateLocationDto } from 'applications/dto/request/updateLocation.dto';
import {
  LocationResponseDetailDto,
  LocationResponseDto,
} from 'applications/dto/response/locationResponse.dto';
import { GetLocationQuery } from 'applications/query/getLocation.query';
import { GetLocationDetailQuery } from 'applications/query/getLocationDetail.query';

@Controller('/api/location')
export class LocationController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({
    description: `This API use to retrive all the locations.`,
  })
  @ApiResponse({
    type: [LocationResponseDetailDto],
  })
  @HttpCode(HttpStatus.OK)
  @Get('/')
  getLocations() {
    return this.queryBus.execute(new GetLocationQuery());
  }

  @ApiOperation({
    description: `This API use to retrive location by id.`,
  })
  @ApiResponse({
    type: LocationResponseDetailDto,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:locationId')
  createPaymentMethod(@Param('locationId') locationId: string) {
    return this.queryBus.execute(new GetLocationDetailQuery(locationId));
  }

  @ApiOperation({
    description: `This API use to create a location.`,
  })
  @ApiResponse({
    type: LocationResponseDto,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  createLocation(@Body() createLocationDto: CreateLocationDto) {
    const { building, locationName, locationNumber, area } = createLocationDto;
    return this.commandBus.execute(
      new CreateLocationCommand(building, locationName, locationNumber, area),
    );
  }

  @ApiOperation({
    description: `This API use to update a location.`,
  })
  @ApiResponse({
    type: LocationResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @Put('/:locationId')
  updateLocation(
    @Param('locationId') locationId: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    const { building, locationName, locationNumber, area } = updateLocationDto;
    return this.commandBus.execute(
      new UpdateLocationCommand(
        locationId,
        building,
        locationName,
        locationNumber,
        area,
      ),
    );
  }

  @ApiOperation({
    description: `This API use to update a location.`,
  })
  @ApiResponse({
    type: LocationResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @Put('/:locationId/sub-location')
  addSubLocation(
    @Param('locationId') locationId: string,
    @Body() CreateLocationDto: CreateLocationDto,
  ) {
    const { building, locationName, locationNumber, area } = CreateLocationDto;
    return this.commandBus.execute(
      new AddSubLocationCommand(
        locationId,
        building,
        locationName,
        locationNumber,
        area,
      ),
    );
  }

  @ApiOperation({
    description: `This API use to delete a location.`,
  })
  @ApiResponse({})
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:locationId')
  deleteLocation(@Param('locationId') locationId: string) {
    return this.commandBus.execute(new DeleteLocationCommand(locationId));
  }
}
