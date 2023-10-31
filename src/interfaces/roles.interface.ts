
export enum EGuard {
  WEB = 'web',
  ADMIN = 'admin',
}
export interface IRole {
  _id?: string;
  name: string;
  guard: EGuard;
}
