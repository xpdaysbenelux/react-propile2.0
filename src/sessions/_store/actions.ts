import { Action } from 'redux';
import { ApiError } from '../../_http';
import { ISessionForm } from '../_models';

export enum SessionsActionType {
  CreateSession = '[Sessions] CreateSession',
  CreateSessionError = '[Sessions] CreateSessionError',
  CreateSessionSuccess = '[Sessions] CreateSessionSuccess',
}

export class CreateSession implements Action<SessionsActionType> {
  readonly type = SessionsActionType.CreateSession;
  constructor(public payload: { values: ISessionForm }) {}
}

export class CreateSessionSuccess implements Action<SessionsActionType> {
  readonly type = SessionsActionType.CreateSessionSuccess;
  constructor() {}
}

export class CreateSessionError implements Action<SessionsActionType> {
  readonly type = SessionsActionType.CreateSessionError;
  constructor(public payload: { error: ApiError }) {}
}

export type SessionsAction = CreateSession | CreateSessionSuccess | CreateSessionError;
