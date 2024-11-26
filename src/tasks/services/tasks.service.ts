import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { TaskDto } from '../dtos';
import { TASK_STATES_ENUM } from '../enums/task-states.enum';
import { TasksRepository } from '../repositories/tasks.repository';
import { AgentsRepository } from 'src/agents/repositories/agents.repository';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly agentsRepository: AgentsRepository,
  ) {}

  public async createAndAssign(ticketId: number): Promise<TaskDto> {
    const agents = await this.agentsRepository.getEnabledAgents();
    const agentsIds = agents.map((agent) => agent.id);

    const agentsPriorityPoints =
      await this.tasksRepository.getTotalPriorityPointsByAgentIds(agentsIds);

    const agentsWithPriorityPoints = agents.map((agent) => {
      const agentPriorityPoints = agentsPriorityPoints.find(
        (agentPriorityPoints) => agentPriorityPoints.agentId === agent.id,
      );

      return {
        ...agent,
        priorityPoints: agentPriorityPoints?.priorityPoints || 0,
      };
    });

    const agentWithLessPriorityPoints = agentsWithPriorityPoints.reduce(
      (prev, current) => {
        return prev.priorityPoints < current.priorityPoints ? prev : current;
      },
    );

    const taskSaved = await this.tasksRepository.createTask({
      agentId: agentWithLessPriorityPoints.id,
      ticketId: ticketId,
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
