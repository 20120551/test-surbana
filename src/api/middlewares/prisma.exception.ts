import { Prisma } from '@prisma/client';
import { BaseExceptionFilter } from '@nestjs/core';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { ILogger } from 'shared/modules/log/interfaces';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  constructor(
    @Inject(ILogger)
    private readonly logger: ILogger,
  ) {
    logger.setContext(PrismaClientExceptionFilter.name);
    super();
  }

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    this.logger.error(
      `PrismaClientKnownRequestError message ${exception.message} status ${exception.code}`,
    );

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        return response.status(status).json({
          statusCode: status,
          message: message,
        });
      }
      case 'P2016': {
        const status = HttpStatus.NOT_FOUND;
        return response.status(status).json({
          statusCode: status,
          message: message,
        });
      }
      case 'P2003':
      case 'P2025': {
        const status = HttpStatus.BAD_REQUEST;
        return response.status(status).json({
          statusCode: status,
          message: message,
        });
      }
      default:
        // default 500 error code
        return super.catch(exception, host);
    }
  }
}
