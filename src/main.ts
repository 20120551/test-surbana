import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { createApplication } from './bootstrap';
import { HttpExceptionFilter } from 'api/middlewares/http.exception';
import { PrismaClientExceptionFilter } from 'api/middlewares/prisma.exception';
import { LoggingInterceptor } from 'api/inteceptors/logger.inteceptor';
import { ILogger } from 'shared/modules/log/interfaces';
import { BaseExceptionFilter } from 'api/middlewares/base.exception';

async function bootstrap() {
  const app = await createApplication({
    modules: AppModule,
    enableSwagger: true,
    cors: true,
    logger: false,
  });

  // resolve logger
  const logger = await app.resolve<ILogger>(ILogger);
  // add more things here
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(
    new BaseExceptionFilter(logger),
    new HttpExceptionFilter(logger),
    new PrismaClientExceptionFilter(logger),
  );
  app.useGlobalInterceptors(new LoggingInterceptor(logger));

  logger.info(`Server is listen on port ${3000}`);

  await app.listen(3001);
}
bootstrap();
