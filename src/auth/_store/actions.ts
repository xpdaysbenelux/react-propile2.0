import { Action } from 'redux';
import { ApiError } from '../../_http';
import { IChangePasswordForm, IRequestPasswordResetForm, ILoginForm } from '../_models';
import { IProfile } from '../../profile/_models';

export enum AuthActionType {
  Authenticate = '[Auth] Authenticate',
  AuthenticateError = '[Auth] AuthenticateError',
  AuthenticateSuccess = '[Auth] AuthenticateSuccess',
  ChoosePassword = '[Auth] ChoosePassword',
  ChoosePasswordError = '[Auth] ChoosePasswordError',
  ChoosePasswordSuccess = '[Auth] ChoosePasswordSuccess',
  Login = '[Auth] Login',
  LoginError = '[Auth] LoginError',
  Logout = '[Auth] Logout',
  LogoutError = '[Auth] LogoutError',
  LogoutSuccess = '[Auth] LogoutSuccess',
  RequestPasswordReset = '[Auth] RequestPasswordReset',
  RequestPasswordResetError = '[Auth] RequestPasswordResetError',
  RequestPasswordResetSuccess = '[Auth] RequestPasswordResetSuccess',
}

// AUTHENTICATE
export class Authenticate implements Action<AuthActionType> {
  readonly type = AuthActionType.Authenticate;
}

export class AuthenticateSuccess implements Action<AuthActionType> {
  readonly type = AuthActionType.AuthenticateSuccess;
  constructor(public payload: { pathname?: string; profile: IProfile }) {}
}

export class AuthenticateError implements Action<AuthActionType> {
  readonly type = AuthActionType.AuthenticateError;
  constructor(public payload: { error?: ApiError }) {}
}

// LOGIN
export class Login implements Action<AuthActionType> {
  readonly type = AuthActionType.Login;
  constructor(public payload: { pathname?: string; values: ILoginForm }) {}
}

export class LoginError implements Action<AuthActionType> {
  readonly type = AuthActionType.LoginError;
  constructor(public payload: { error?: ApiError }) {}
}

// CHOOSE PASSWORD
export class ChoosePassword implements Action<AuthActionType> {
  readonly type = AuthActionType.ChoosePassword;
  constructor(public payload: { token: string; values: IChangePasswordForm }) {}
}

export class ChoosePasswordSuccess implements Action<AuthActionType> {
  readonly type = AuthActionType.ChoosePasswordSuccess;
}

export class ChoosePasswordError implements Action<AuthActionType> {
  readonly type = AuthActionType.ChoosePasswordError;
  constructor(public payload: { error: ApiError }) {}
}

// LOGOUT
export class Logout implements Action<AuthActionType> {
  readonly type = AuthActionType.Logout;
}

export class LogoutSuccess implements Action<AuthActionType> {
  readonly type = AuthActionType.LogoutSuccess;
}

export class LogoutError implements Action<AuthActionType> {
  readonly type = AuthActionType.LogoutError;
  constructor(public payload: { error: ApiError }) {}
}

// REQUEST PASSWORD RESET
export class RequestPasswordReset implements Action<AuthActionType> {
  readonly type = AuthActionType.RequestPasswordReset;
  constructor(public payload: { values: IRequestPasswordResetForm }) {}
}

export class RequestPasswordResetSuccess implements Action<AuthActionType> {
  readonly type = AuthActionType.RequestPasswordResetSuccess;
}

export class RequestPasswordResetError implements Action<AuthActionType> {
  readonly type = AuthActionType.RequestPasswordResetError;
  constructor(public payload: { error: ApiError }) {}
}

export type AuthAction =
  | Authenticate
  | AuthenticateSuccess
  | AuthenticateError
  | ChoosePassword
  | ChoosePasswordSuccess
  | ChoosePasswordError
  | Login
  | LoginError
  | Logout
  | LogoutSuccess
  | LogoutError
  | RequestPasswordReset
  | RequestPasswordResetSuccess
  | RequestPasswordResetError;
