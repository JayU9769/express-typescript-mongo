import { Role } from '@interfaces/roles.interface';

export interface Admin {
  _id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  phone_no: string;
  status: number;
  roles: Array<Role>;
}
