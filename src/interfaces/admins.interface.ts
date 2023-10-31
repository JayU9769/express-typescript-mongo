import { IRole } from '@interfaces/roles.interface';

export interface IAdmin {
  _id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  phone_no: string;
  status: number;
  roles: Array<IRole> | Array<string>;
}
