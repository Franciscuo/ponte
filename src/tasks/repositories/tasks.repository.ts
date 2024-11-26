import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { TASK_STATES_ENUM } from '../enums/task-states.enum';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(
    @InjectRepository(Task)
    repository: Repository<Task>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  public async createTask(task: CreateTaskDto): Promise<Task> {
    const newTask = this.create({
      statusId: TASK_STATES_ENUM.IN_PROGRESS,
      agentId: task.agentId,
      ticketId: task.ticketId,
      createdAt: task.externalCreatedAt,
    });

    return this.save(newTask);
  }

  public async updateStatusIdById(task: {
    id: number;
    statusId: TASK_STATES_ENUM;
  }): Promise<Task> {
    const currentTask = await this.findOneBy({ id: task.id });

    currentTask.statusId = task.statusId;

    return this.save(task);
  }

  public async getTotalPriorityPointsByAgentIds(
    agentIds: number[],
  ): Promise<{ agentId: number; priorityPoints: number }[]> {
    return this.createQueryBuilder('task')
      .select('task.agentId', 'agentId')
      .addSelect('SUM(ticket.priority)', 'priorityPoints')
      .innerJoin('task.ticket', 'ticket')
      .where('task.agentId IN (:...agentIds)', { agentIds })
      .groupBy('task.agentId')
      .orderBy('priorityPoints', 'ASC')
      .getRawMany();
  }
}
