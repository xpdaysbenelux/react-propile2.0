import { IPermissions } from '../../roles/_models';

export function hasUsersPermissions(permissions: IPermissions): boolean {
  if (permissions?.users.view) return true;
  if (permissions?.users.edit) return true;
  return false;
}

export function hasRolesPermissions(permissions: IPermissions): boolean {
  if (permissions?.roles.view) return true;
  if (permissions?.roles.edit) return true;
  return false;
}
