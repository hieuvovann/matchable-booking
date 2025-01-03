import { Controller, Get, Query } from '@nestjs/common';

import { AccountVerified } from '@/auth/decorators/account-verified';

import { SessionsService } from './sessions.service';
import { SessionResponse } from './dto/session-response.dto';
import { SessionRequestQuery } from './dto/sessio-request.dto';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @AccountVerified('jwt')
  @Get()
  getSessions(@Query() query: SessionRequestQuery): Promise<SessionResponse[]> {
    return this.sessionsService.findSessions(query);
  }
}
