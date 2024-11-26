import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { AgentDto } from '../dtos';
import { AgentsRepository } from '../repositories/agents.repository';

@Injectable()
export class AgentsService {
  constructor(private readonly agentsRepository: AgentsRepository) {}

  public async enableaAgents(count: number): Promise<AgentDto[]> {
    await this.agentsRepository.disableAllAgents();
    await this.agentsRepository.enableAgents(count);

    const agents = await this.agentsRepository.getEnabledAgents();

    return agents.map((agent) => plainToInstance(AgentDto, agent));
  }
}
