import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task, TaskState } from './entities';
import { TasksService } from './services/tasks.service';
import { TasksRepository } from './repositories/tasks.repository';
import { TaskStatesRepository } from './repositories/task-states.repository';

import { Agent } from '../agents/entities';
import { AgentsRepository } from '../agents/repositories/agents.repository';

@Module({
  providers: [
    TasksService,
    TasksRepository,
    AgentsRepository,
    TaskStatesRepository,
  ],
  imports: [
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([Agent]),
    TypeOrmModule.forFeature([TaskState]),
  ],
  exports: [TasksRepository, TaskStatesRepository],
})
export class TasksModule {}
