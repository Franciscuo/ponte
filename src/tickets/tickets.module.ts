import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Ticket } from './entities';
import { TicketsService } from './services/tickets.service';
import { TicketsController } from './controllers/tickets.controller';
import { TicketsRepository } from './repositories/tickets.repository';

import { Agent } from '../agents/entities';
import { AgentsService } from '../agents/services/agents.service';
import { AgentsRepository } from '../agents/repositories/agents.repository';

import { ReportsService } from '../reports/services/reports.service';

import { Task, TaskState } from '../tasks/entities';
import { TasksService } from '../tasks/services/tasks.service';
import { TasksRepository } from '../tasks/repositories/tasks.repository';

@Module({
  controllers: [TicketsController],
  providers: [
    TasksService,
    AgentsService,
    TicketsService,
    ReportsService,
    TasksRepository,
    AgentsRepository,
    TicketsRepository,
  ],
  imports: [
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([Agent]),
    TypeOrmModule.forFeature([Ticket]),
    TypeOrmModule.forFeature([TaskState]),
  ],
  exports: [TicketsRepository],
})
export class TicketsModule {}
