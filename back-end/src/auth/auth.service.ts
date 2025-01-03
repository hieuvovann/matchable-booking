import * as argon2 from 'argon2';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDTO } from '@/users/dtos/create-user.dto';
import { UserEntity } from '@/users/entities/user.entity';

import { UsersService } from '../users/users.service';

import { AuthTokensDTO } from './dtos/auth-tokens.dto';
import { LoginResponseDTO } from './dtos/login-response.dto';
import { IAuthUser } from './types/auth-user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUserEmailPassword(
    email: string,
    password: string,
  ): Promise<IAuthUser | null> {
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      return null;
    }

    const matchPasswords = await argon2.verify(user.password, password);

    if (!matchPasswords) {
      return null;
    }

    return this.getAuthUser(user);
  }

  async validateUserById(userId: number): Promise<IAuthUser | null> {
    const user = await this.userService.findUserById(userId);

    if (!user) {
      return null;
    }

    return this.getAuthUser(user);
  }

  async signIn(user: IAuthUser): Promise<LoginResponseDTO> {
    const { accessToken } = await this.getTokens(user);

    return {
      accessToken,
      user,
    };
  }

  async getTokens(authUser: IAuthUser): Promise<AuthTokensDTO> {
    const accessToken = await this.jwtService.signAsync(authUser, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES'),
    });

    return {
      accessToken,
    };
  }

  async signUp(user: CreateUserDTO): Promise<IAuthUser> {
    const hashedPassword = await argon2.hash(user.password);
    const createdUser = await this.userService.createUser({
      ...user,
      password: hashedPassword,
    });

    return this.getAuthUser(createdUser);
  }

  private async getAuthUser(user: UserEntity): Promise<IAuthUser> {
    return {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    };
  }
}
