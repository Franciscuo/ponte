import { Post, Body, UseGuards, Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AgentDto } from '../dtos';
import { ApiKeyGuard } from '../../auth/api-key.guard';
import { AgentsService } from '../services/agents.service';
import { EnableAgentsDto } from '../dtos/enable-agents.dto';

@Controller('agents')
@ApiTags('Agents')
@ApiBearerAuth()
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Post('enable')
  @UseGuards(ApiKeyGuard)
  @ApiResponse({
    status: 201,
    type: AgentDto,
    isArray: true,
    description: 'Enables a number of agents',
  })
  enableAgents(@Body() enableAgents: EnableAgentsDto): Promise<AgentDto[]> {
    return this.agentsService.enableaAgents(enableAgents.count);
  }
}
