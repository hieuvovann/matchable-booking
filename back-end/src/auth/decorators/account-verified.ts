import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export type IStrategyType = 'local' | 'jwt';

export function AccountVerified(strategyType: IStrategyType) {
  return applyDecorators(UseGuards(AuthGuard(strategyType)));
}
