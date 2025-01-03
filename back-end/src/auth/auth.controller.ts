import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { CreateUserDTO } from '@/users/dtos/create-user.dto';

import { AccountVerified } from './decorators/account-verified';
import { LoginResponseDTO } from './dtos/login-response.dto';
import { SignInDTO } from './dtos/sign-in.dto';
import { IAuthRequest } from './types/auth-request';
import { IAuthUser } from './types/auth-user';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-up')
  signUp(@Body() createUserDto: CreateUserDTO): Promise<IAuthUser> {
    return this.authService.signUp(createUserDto);
  }

  @ApiBody({ type: SignInDTO })
  @AccountVerified('local')
  @Post('sign-in')
  signIn(@Req() authRequest: IAuthRequest): Promise<LoginResponseDTO> {
    return this.authService.signIn(authRequest.user);
  }
}
