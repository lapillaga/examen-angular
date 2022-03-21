import { Rol } from 'src/app/model/rol';

export interface User {
  identificacion: string;
  nombres: string;
  username: string;
  email: string;
  rol?: Rol;
  empresa?: string;
}
