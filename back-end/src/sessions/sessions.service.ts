import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { SessionEntity } from './entities/session.entity';
import { SessionResponse } from './dto/session-response.dto';
import { SessionRequestQuery } from './dto/sessio-request.dto';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
  ) {}

  async findSessions(filter?: SessionRequestQuery): Promise<SessionResponse[]> {
    const query = this.sessionRepository
      .createQueryBuilder('s')
      .leftJoinAndSelect('s.trainerSessions', 'ts')
      .leftJoinAndSelect('ts.trainer', 't');

    if (filter?.ids?.length) {
      query.andWhere('s.id IN (:...ids)', { ids: filter.ids });
    }

    if (filter?.trainerIds?.length) {
      query.andWhere('t.id IN (:...trainerIds)', {
        trainerIds: filter.trainerIds,
      });
    }

    const result = await query.getMany();
    return result.map((session) => ({
      id: session.id,
      name: session.name,
      trainers: session.trainerSessions.map((ts) => ({
        id: ts.trainer.id,
        name: ts.trainer.name,
        costPerHour: Number(ts.costPerHour),
      })),
    }));
  }
}
