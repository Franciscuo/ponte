import { Injectable } from '@nestjs/common';

import { TasksService } from '../../tasks/services/tasks.service';
import { AgentsService } from '../../agents/services/agents.service';
import { TicketsRepository } from '../repositories/tickets.repository';
import { ReportsService } from '../../reports/services/reports.service';

@Injectable()
export class TicketsService {
  constructor(
    private readonly tasksService: TasksService,
    private readonly agentsService: AgentsService,
    private readonly reportsService: ReportsService,
    private readonly ticketsRepository: TicketsRepository,
  ) {}

  public async assign(agent_count: number): Promise<void> {
    await this.agentsService.enableaAgents(agent_count);
    const tickets = await this.reportsService.read();

    for (const ticket of tickets) {
      await this.ticketsRepository.createTicket({
        id: ticket.id,
        priority: ticket.priority,
        setCreateDate: ticket.createdAt,
      });
    }

    const tickets_ordered_by_priority = [5, 4, 3, 2, 1].reduce(
      (acc, priority) =>
        acc.concat(tickets.filter((ticket) => ticket.priority === priority)),
      [],
    );

    for (const ticket of tickets_ordered_by_priority) {
      await this.tasksService.createAndAssign(ticket.id);
    }
  }
}
