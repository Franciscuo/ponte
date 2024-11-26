import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task, TaskState } from './entities';
import { TasksRepository } from './repositories/tasks.repository';
import { TaskStatesRepository } from './repositories/task-states.repository';

@Module({
  providers: [TasksRepository, TaskStatesRepository],
  imports: [
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([TaskState]),
  ],
  exports: [TasksRepository, TaskStatesRepository],
})
export class TasksModule {}
