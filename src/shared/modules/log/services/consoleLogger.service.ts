import {
  ConsoleLogger,
  Inject,
  Injectable,
  LogLevel,
  Scope,
} from '@nestjs/common';
import { ILogger, LoggerOptions } from '../interfaces';
import { LoggerModuleOptions, MODULE_LOGGER_OPTIONS } from '..';

@Injectable({ scope: Scope.TRANSIENT })
export class ConsoleLogService implements ILogger {
  private options: LoggerModuleOptions;
  private logger: ConsoleLogger;
  constructor(
    @Inject(MODULE_LOGGER_OPTIONS)
    options: LoggerModuleOptions,
  ) {
    this.options = options;
    this.logger = new ConsoleLogger();
  }

  setContext(context: string): void {
    this.formatContext(context);
  }

  info(message: string, options?: LoggerOptions): void {
    this.logger.log(this.buildMessage(message, options));
  }

  debug(message: string, options?: LoggerOptions): void {
    this.logger.debug(this.buildMessage(message, options));
  }

  error(message: string, options: LoggerOptions): void {
    this.logger.error(this.buildMessage(message, options));
  }

  private formatContext(context: string) {
    const overrideContext = this.options.service
      ? `${this.options.service}:${context}`
      : '';
    const newContext = context ? overrideContext : '';

    this.logger.setContext(newContext);
  }

  private buildMessage(message: string, options?: LoggerOptions) {
    if (options?.correlationId) {
      return `${options.correlationId}: ${message}`;
    }

    return message;
  }
}
