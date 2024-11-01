import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import { ConfigDto } from './dto/config.dto';

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(ConfigDto, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
