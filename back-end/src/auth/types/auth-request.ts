import { Request } from 'express';

import { IAuthUser } from './auth-user';

export interface IAuthRequest extends Request {
  user: IAuthUser;
}
