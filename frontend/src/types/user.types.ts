export interface IUser {
  id: number;
  name: string;
  role: string;
  username: string;
  lastAction: string;
  isActive: number;
}


export interface IUserWhoamiRes {
  user: IUser;
  permissions: Array<string>;
}
