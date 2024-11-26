import { registerAs } from '@nestjs/config';

import { AppConfig } from './config.type';

export const applicationConfig = registerAs<AppConfig>('app', () => ({
  nodeEnv: process.env.ENVIRONMENT || 'develop',
  name: process.env.APP_NAME || 'ponte',
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  timeout: process.env.TIMEOUT ? parseInt(process.env.TIMEOUT, 10) : 1000,
  apiKey: process.env.API_KEY,
}));
