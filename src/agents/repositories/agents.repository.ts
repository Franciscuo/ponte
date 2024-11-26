import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Agent } from '../entities/agent.entity';

@Injectable()
export class AgentsRepository extends Repository<Agent> {
  constructor(
    @InjectRepository(Agent)
    repository: Repository<Agent>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  public async disableAllAgents(): Promise<void> {
    await this.update({}, { enabled: false });
  }

  public async enableAgents(count: number): Promise<void> {
    const agents = await this.find({ take: count });
    for (const agent of agents) {
      agent.enabled = true;
    }

    await this.save(agents);
  }

  public async getEnabledAgents(): Promise<Agent[]> {
    return this.find({ where: { enabled: true } });
  }
}
