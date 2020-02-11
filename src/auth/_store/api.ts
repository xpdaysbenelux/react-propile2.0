import { IChangePasswordForm, ILoginForm, IRequestPasswordResetForm } from '../_models';
import { HttpClient } from '../../_http';
import { IProfile } from '../../profile/_models';

export function choosePassword(body: IChangePasswordForm, resetToken: string): Promise<void> {
  return HttpClient.post('auth/reset-password', { ...body, resetToken });
}

export function login(body: ILoginForm): Promise<IProfile> {
  return HttpClient.post<IProfile>('auth/login', body);
}

export function logout(): Promise<void> {
  return HttpClient.post('auth/logout');
}

export function requestPasswordReset(body: IRequestPasswordResetForm): Promise<void> {
  return HttpClient.post('auth/request-password-reset', body);
}

export function authenticate(): Promise<IProfile> {
  return HttpClient.get<IProfile>('auth/authenticate');
}
