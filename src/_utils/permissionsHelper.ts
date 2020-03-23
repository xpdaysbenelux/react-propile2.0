import { IPermissions } from '../roles/_models';

export function createDefaultPermissions(): IPermissions {
  return {
    conferences: {
      edit: false,
      view: false,
    },
    personas: {
      edit: false,
      view: true,
    },
    programs: {
      edit: false,
      view: false,
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
