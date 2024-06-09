import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { ILogger } from 'shared/modules/log/interfaces';

@Catch(Error)
export class BaseExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(ILogger)
    private readonly logger: ILogger,
  ) {
    logger.setContext(BaseExceptionFilter.name);
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error(`Error message ${exception.message} `);

    return response.status(500).json({
      statusCode: 500,
      message: exception.message,
    });
  }
}
