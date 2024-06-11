import { env } from 'process';
import { NestFactory } from '@nestjs/core';
import {
  DynamicModule,
  ForwardReference,
  INestApplication,
  Type,
  Module as ModuleDecorator,
  NestApplicationOptions,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';

export type ImportType = Array<
  Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
>;

export type BootstrapOptions = NestApplicationOptions & {
  enableSwagger?: boolean;
  allowLargePayload?: boolean;
  worker?: boolean;
  modules: object;
};

export const setupSwagger = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Location')
    .setDescription('The Location API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(`/`)
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
  const { modules, worker, enableSwagger, allowLargePayload, ...payload } =
    options || {};
  const applicationContext = getApplicationContext(worker);

  const app = await applicationContext(modules, payload);

  if (enableSwagger) {
    setupSwagger(app);
  }

  if (allowLargePayload) {
    app.use(json({ limit: '50mb' }));
  }

  return app as INestApplication<any>;
};
