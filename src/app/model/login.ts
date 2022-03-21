import { User } from 'src/app/model/user';

export interface LoginResponse {
  status: string;
  message: string;
  token: string;
  user: User;
}
