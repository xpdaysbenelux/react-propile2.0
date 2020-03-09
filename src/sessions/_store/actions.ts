import { Action } from 'redux';
import { ApiError, HttpMetadataPagingResponse } from '../../_http';
import { ICreateSessionForm, ISession, IUpdateSessionForm } from '../_models';

export enum SessionsActionType {
  CreateSession = '[Sessions] CreateSession',
  CreateSessionError = '[Sessions] CreateSessionError',
  CreateSessionSuccess = '[Sessions] CreateSessionSuccess',
  GetSessions = '[Sessions] GetSessions',
  GetSessionsError = '[Sessions] GetSessionsError',
  GetSessionsSuccess = '[Sessions] GetSessionsSuccess',
  UpdateSession = '[Sessions] UpdateSession',
  UpdateSessionError = '[Sessions] UpdateSessionError',
  UpdateSessionSuccess = '[Sessions] UpdateSessionSuccess',
}

export class GetSessions implements Action<SessionsActionType> {
  readonly type = SessionsActionType.GetSessions;
  constructor(public payload: { userId: string }) {}
}

export class GetSessionsSuccess implements Action<SessionsActionType> {
  readonly type = SessionsActionType.GetSessionsSuccess;
  constructor(public payload: { data: ISession[]; meta: HttpMetadataPagingResponse }) {}
}

export class GetSessionsError implements Action<SessionsActionType> {
  readonly type = SessionsActionType.GetSessionsError;
  constructor(public payload: { error: ApiError }) {}
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
  | GetSessions
  | GetSessionsSuccess
  | GetSessionsError
  | CreateSession
  | CreateSessionSuccess
  | CreateSessionError
  | UpdateSession
  | UpdateSessionSuccess
  | UpdateSessionError;
