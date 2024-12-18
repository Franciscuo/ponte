import { registerAs } from '@nestjs/config';

import { DatabaseConfig } from './config.type';

export const databaseConfig = registerAs<DatabaseConfig>('database', () => ({
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  maxConnections: 100,
  connectTimeoutMS: 5000,
  logging: false,
  autoLoadEntities: false,
  entities: ['dist/**/entities/*.entity.js'],
  migrations: ['src/databse/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
}));
