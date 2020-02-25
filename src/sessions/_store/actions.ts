import { Action } from 'redux';
import { ApiError } from '../../_http';
import { ICreateSessionForm, ISession, IUpdateSessionForm } from '../_models';

export enum SessionsActionType {
  CreateSession = '[Sessions] CreateSession',
  CreateSessionError = '[Sessions] CreateSessionError',
  CreateSessionSuccess = '[Sessions] CreateSessionSuccess',
  UpdateSession = '[Sessions] UpdateSession',
  UpdateSessionError = '[Sessions] UpdateSessionError',
  UpdateSessionSuccess = '[Sessions] UpdateSessionSuccess',
}

export class CreateSession implements Action<SessionsActionType> {
  readonly type = SessionsActionType.CreateSession;
  constructor(public payload: { values: ICreateSessionForm }) {}
}

export class CreateSessionSuccess implements Action<SessionsActionType> {
  readonly type = SessionsActionType.CreateSessionSuccess;
}

export class CreateSessionError implements Action<SessionsActionType> {
  readonly type = SessionsActionType.CreateSessionError;
  constructor(public payload: { error: ApiError }) {}
}

export class UpdateSession implements Action<SessionsActionType> {
  readonly type = SessionsActionType.UpdateSession;
  constructor(public payload: { sessionId: string; values: IUpdateSessionForm }) {}
}

export class UpdateSessionSuccess implements Action<SessionsActionType> {
  readonly type = SessionsActionType.UpdateSessionSuccess;
  constructor(public payload: { updatedSession: ISession }) {}
}

export class UpdateSessionError implements Action<SessionsActionType> {
  readonly type = SessionsActionType.UpdateSessionError;
  constructor(public payload: { error: ApiError }) {}
}

export type SessionsAction =
  | CreateSession
  | CreateSessionSuccess
  | CreateSessionError
  | UpdateSession
  | UpdateSessionSuccess
  | UpdateSessionError;
