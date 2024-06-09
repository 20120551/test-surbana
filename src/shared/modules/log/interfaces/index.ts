import { LoggerService } from '@nestjs/common';

export const ILogger = 'ILogger';

export type LoggerOptions = {
  correlationId: string;
};
export interface ILogger {
  setContext(context: string): void;
  info(message: string, options?: LoggerOptions): void;
  debug(message: string, options?: LoggerOptions): void;
  error(message: string, options?: LoggerOptions): void;
}
