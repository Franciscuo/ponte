import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { TasksModule } from './tasks/tasks.module';
import { HealthModule } from './health/health.module';
import { AgentsModule } from './agents/agents.module';
import { TicketsModule } from './tickets/tickets.module';
import { ReportsModule } from './reports/reports.module';
import { databaseConfig } from './config/database.config';
import { applicationConfig } from './config/application.config';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [applicationConfig, databaseConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
    }),
    TasksModule,
    HealthModule,
    AgentsModule,
    ReportsModule,
    TicketsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
