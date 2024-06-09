import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { ILogger } from 'shared/modules/log/interfaces';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(ILogger)
    private readonly logger: ILogger,
  ) {
    logger.setContext(HttpExceptionFilter.name);
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const res = exception.getResponse();

    this.logger.error(
      `HttpException message ${exception.message} status ${status}`,
    );

    return response.status(status).json({
      statusCode: status,
      message: typeof res === 'string' ? res : res['message'],
    });
  }
}
