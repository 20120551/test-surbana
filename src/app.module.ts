import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { LocationController } from 'api/controllers/location.controller';
import { ApplicationModule } from 'applications/application.module';
import { LoggerModule } from 'shared/modules/log/logger.module';

@Module({
  imports: [
    ApplicationModule,
    CqrsModule,
    LoggerModule.register({
      service: 'surbana-location-service',
      isGlobal: true,
    }),
  ],
  controllers: [LocationController],
})
export class AppModule {}
