import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Post, Body, UseGuards, Controller } from '@nestjs/common';

import { AgentDto } from '../dtos';
import { ApiKeyGuard } from '../../auth/api-key.guard';
import { AgentsService } from '../services/agents.service';

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
  enableAgents(@Body() count: number): Promise<AgentDto[]> {
    return this.agentsService.enableaAgents(count);
  }
}
