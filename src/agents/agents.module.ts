import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Agent } from './entities';
import { AgentsService } from './services/agents.service';
import { AgentsController } from './controllers/agent.controller';
import { AgentsRepository } from './repositories/agents.repository';

@Module({
  controllers: [AgentsController],
  providers: [AgentsService, AgentsRepository],
  imports: [TypeOrmModule.forFeature([Agent])],
  exports: [AgentsRepository],
})
export class AgentsModule {}
