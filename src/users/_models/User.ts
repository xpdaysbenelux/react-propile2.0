export interface IUser {
  createdAt?: string;
  createdBy?: string;
  email: string;
  firstName?: string;
  id: string;
  lastName?: string;
  roles: {
    id: string;
    name: string;
  }[];
  state: UserState;
  updatedAt?: string;
  updatedBy?: string;
}

export interface IUserForm {
  email?: string;
  firstName?: string;
  lastName?: string;
  roleIds?: string[];
}

export enum UserState {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Registering = 'REGISTERING',
}
