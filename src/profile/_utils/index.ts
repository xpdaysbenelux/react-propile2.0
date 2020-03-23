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

export function hasSessionsPermissions(permissions: IPermissions): boolean {
  if (permissions?.sessions.view) return true;
  if (permissions?.sessions.edit) return true;
  return false;
}

export function hasConferencesPermissions(permissions: IPermissions): boolean {
  // TODO: Check permissions here if backend has implemented the conferences permissions
  return true;
}

export function hasSessionsAdminPermissions(permissions: IPermissions): boolean {
  if (permissions?.sessions.admin) return true;
  return false;
}
