import { env } from 'process';
import { NestFactory } from '@nestjs/core';
import {
  DynamicModule,
  ForwardReference,
  INestApplication,
  Type,
  Module as ModuleDecorator,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export type ImportType = Array<
  Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
>;

export type BootstrapOptions = {
  enableSwagger?: boolean;
  enableLogger?: boolean;
  allowLargePayload?: boolean;
  worker?: boolean;
  modules: object;
};

export const setupSwagger = (app: INestApplication) => {
  const environment = env.NODE_ENV ?? '';
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Location')
    .setDescription('The Location API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(`/${environment}`)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
};

export const createCustomModule = (modules: ImportType) => {
  class CustomDecorator {}
  ModuleDecorator({ imports: modules })(CustomDecorator);
  return CustomDecorator;
};

export const getApplicationContext = (worker?: boolean) => {
  if (worker) {
    return NestFactory.createApplicationContext.bind(NestFactory);
  }

  return NestFactory.create.bind(NestFactory);
};

export const createApplication = async (options?: BootstrapOptions) => {
  const modules = options?.modules;
  const applicationContext = getApplicationContext(options?.worker);

  const app = await applicationContext(modules, {
    logger: options.enableLogger,
  });

  return app as INestApplication<any>;
};
