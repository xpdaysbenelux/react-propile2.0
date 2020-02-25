export interface IRole {
  createdAt: string;
  id: string;
  name: string;
  permissions: IPermissions;
  updatedAt: string;
}

export interface IPermissions {
  personas: {
    edit: boolean;
    view: boolean;
  };
  roles: {
    edit: boolean;
    view: boolean;
  };
  sessions: {
    admin: boolean;
    edit: boolean;
    view: boolean;
  };
  users: {
    edit: boolean;
    view: boolean;
  };
}

export interface IRoleForm {
  name: string;
  permissions: IPermissions;
}
