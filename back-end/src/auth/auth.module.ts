import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '@/users/users.module';

import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { EmailAvailableConstraint } from './validations/email-available';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, JwtModule.register({}), PassportModule],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    EmailAvailableConstraint,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
