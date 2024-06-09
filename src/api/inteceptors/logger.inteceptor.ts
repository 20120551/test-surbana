import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ILogger } from 'shared/modules/log/interfaces';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(ILogger)
    private readonly logger: ILogger,
  ) {
    logger.setContext(LoggingInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    const ip = this.getIP(request);

    this.logger.info(
      `Incoming Request on ${request.path} method=${request.method}`,
      {
        correlationId: ip,
      },
    );

    return next.handle().pipe(
      tap(() => {
        this.logger.info(
          `End Request for ${request.path} method=${request.method} duration=${Date.now() - now}ms`,
          {
            correlationId: ip,
          },
        );
      }),
    );
  }

  private getIP(request: any): string {
    let ip: string;
    const ipAddr = request.headers['x-forwarded-for'];
    if (ipAddr) {
      const list = ipAddr.split(',');
      ip = list[list.length - 1];
    } else {
      ip = request.connection.remoteAddress;
    }
    return ip.replace('::ffff:', '');
  }
}
