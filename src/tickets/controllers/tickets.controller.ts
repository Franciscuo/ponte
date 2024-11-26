import { Post, Body, UseGuards, Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AssignTicketsDto } from '../dtos';
import { ApiKeyGuard } from '../../auth/api-key.guard';
import { TicketsService } from '../services/tickets.service';

@Controller('tickets')
@ApiTags('Tickets')
@ApiBearerAuth()
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post('assign')
  @UseGuards(ApiKeyGuard)
  @ApiResponse({
    status: 201,
    type: undefined,
    description: 'Loads and assigns tickets to agents',
  })
  enableAgents(@Body() assign: AssignTicketsDto): Promise<void> {
    return this.ticketsService.assign(assign.agent_count);
  }
}
