import { IAuthUser } from '../types/auth-user';

export class LoginResponseDTO {
  accessToken: string;
  user: IAuthUser;
}
