import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { TaskDto } from '../dtos';
import { TasksRepository } from '../repositories/tasks.repository';
import { AgentsRepository } from 'src/agents/repositories/agents.repository';
import { TASK_STATES_ENUM } from '../enums/task-states.enum';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly agentsRepository: AgentsRepository,
  ) {}

  public async createAndAssign(task: {
    ticketId: number;
    externalCreatedAt: Date;
  }): Promise<TaskDto> {
    const agents = await this.agentsRepository.getEnabledAgents();
    const agentsIds = agents.map((agent) => agent.id);

    const agentsPriorityPoints =
      await this.tasksRepository.getTotalPriorityPointsByAgentIds(agentsIds);

    const agentWithLessPriorityPoints = agentsPriorityPoints[0];

    const taskSaved = await this.tasksRepository.createTask({
      agentId: agentWithLessPriorityPoints.agentId,
      ticketId: task.ticketId,
      externalCreatedAt: task.externalCreatedAt,
    });

    setTimeout(() => {
      this.finishTask(taskSaved.id);
    }, 4000);

    return plainToInstance(TaskDto, taskSaved);
  }

  public async finishTask(taskId: number): Promise<TaskDto> {
    const task = await this.tasksRepository.updateStatusIdById({
      id: taskId,
      statusId: TASK_STATES_ENUM.FINISHED,
    });

    return plainToInstance(TaskDto, task);
  }
}
