import { Injectable } from '@nestjs/common';

import { HealthDto } from '../dto/version.dto';
import { version } from '../../../package.json';

@Injectable()
export class HealthService {
  getVersion(): HealthDto {
    return {
      version,
    };
  }
}
