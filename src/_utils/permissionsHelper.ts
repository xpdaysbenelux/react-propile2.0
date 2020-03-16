import { IPermissions } from '../roles/_models';

export function createDefaultPermissions(): IPermissions {
  return {
    personas: {
      edit: false,
      view: true,
    },
    roles: {
      edit: false,
      view: false,
    },
    sessions: {
      admin: false,
      edit: true,
      view: true,
    },
    users: {
      edit: false,
      view: false,
    },
  };
}
