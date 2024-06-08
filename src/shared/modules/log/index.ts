import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface LoggerModuleOptions {
  service?: string;
}
export const {
  ConfigurableModuleClass: ConfigurableLoggerModuleClass,
  MODULE_OPTIONS_TOKEN: MODULE_LOGGER_OPTIONS,
} = new ConfigurableModuleBuilder<LoggerModuleOptions>()
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
