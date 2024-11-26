export type DatabaseConfig = {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database?: string;
  synchronize?: boolean;
  maxConnections?: number;
};

export type AppConfig = {
  nodeEnv: string;
  name: string;
  port: number;
  timeout: number;
  apiKey: string;
};

export type AllConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
};
