import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface PrismaModuleOptions {}
export const {
  ConfigurableModuleClass: ConfigurablePrismaModuleClass,
  MODULE_OPTIONS_TOKEN: MODULE_PRISMA_OPTIONS,
} = new ConfigurableModuleBuilder<PrismaModuleOptions>()
  .setExtras(
    {
      isGlobal: true,
    },
    (definition, extras) => ({
      ...definition,
      global: extras.isGlobal,
    }),
  )
  .build();
