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
  if (permissions?.conferences.view) return true;
  if (permissions?.conferences.edit) return true;
  return false;
}

export function hasProgramsPermissions(permissions: IPermissions): boolean {
  if (permissions?.programs.view) return true;
  if (permissions?.programs.edit) return true;
  return false;
}

export function hasSessionsAdminPermissions(permissions: IPermissions): boolean {
  if (permissions?.sessions.admin) return true;
  return false;
}
