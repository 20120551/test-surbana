import { Module } from '@nestjs/common';
import { ConfigurableLoggerModuleClass } from '.';
import { ILogger } from './interfaces';
import { ConsoleLogService } from './services';

@Module({
  providers: [
    {
      provide: ILogger,
      useClass: ConsoleLogService,
    },
  ],
  exports: [ILogger],
})
export class LoggerModule extends ConfigurableLoggerModuleClass {}
