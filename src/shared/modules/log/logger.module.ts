import { Module } from '@nestjs/common';
import { ConfigurableLoggerModuleClass } from '.';
import { ILogger } from './interfaces';
import { ConsoleLogger } from './services/logger.service';

@Module({
  providers: [
    {
      provide: ILogger,
      useClass: ConsoleLogger,
    },
  ],
  exports: [ILogger],
})
export class LoggerModule extends ConfigurableLoggerModuleClass {}
