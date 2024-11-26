import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';

import { HealthDto } from '../dto/version.dto';
import { HealthService } from '../services/health.service';

@Controller('health')
@ApiTags('Health')
@ApiBearerAuth()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiResponse({ status: 200, type: HealthDto })
  getVersion() {
    return this.healthService.getVersion();
  }
}
