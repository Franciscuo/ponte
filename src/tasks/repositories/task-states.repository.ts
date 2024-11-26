import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TaskState } from '../entities/task-state.entity';

@Injectable()
export class TaskStatesRepository extends Repository<TaskState> {
  constructor(
    @InjectRepository(TaskState)
    repository: Repository<TaskState>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
