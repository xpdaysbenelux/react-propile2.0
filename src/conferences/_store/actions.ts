import { Action } from 'redux';

import { IConferenceForm, IConference } from '../_models';
import { ApiError, HttpMetadataPagingResponse, HttpMetadataQuery } from '../../_http';

export enum ConferencesActionType {
  CreateConference = '[Conferences] CreateConference',
  CreateConferenceError = '[Conferences] CreateConferenceError',
  CreateConferenceSuccess = '[Conferences] CreateConferenceSuccess',
  DeleteConference = '[Conferences] DeleteConference',
  DeleteConferenceError = '[Conferences] DeleteConferenceError',
  DeleteConferenceSuccess = '[Conferences] DeleteConferenceSuccess',
  GetConferences = '[Conferences] GetConferences',
  GetConferencesError = '[Conferences] GetConferencesError',
  GetConferencesSuccess = '[Conferences] GetConferencesSuccess',
  SetConferencesQuery = '[Conferences] SetConferencesQuery',
  UpdateConference = '[Conferences] UpdateConference',
  UpdateConferenceError = '[Conferences] UpdateConferenceError',
  UpdateConferenceSuccess = '[Conferences] UpdateConferenceSuccess',
}

export class GetConferences implements Action<ConferencesActionType> {
  readonly type = ConferencesActionType.GetConferences;
}

export class GetConferencesSuccess implements Action<ConferencesActionType> {
  readonly type = ConferencesActionType.GetConferencesSuccess;
  constructor(public payload: { data: IConference[]; meta: HttpMetadataPagingResponse }) {}
}

export class GetConferencesError implements Action<ConferencesActionType> {
  readonly type = ConferencesActionType.GetConferencesError;
  constructor(public payload: { error: ApiError }) {}
}

export class SetConferencesQuery implements Action<ConferencesActionType> {
  readonly type = ConferencesActionType.SetConferencesQuery;
  constructor(public payload: { query: HttpMetadataQuery }) {}
}

export class CreateConference implements Action<ConferencesActionType> {
  readonly type = ConferencesActionType.CreateConference;
  constructor(public payload: { values: IConferenceForm }) {}
}

export class CreateConferenceSuccess implements Action<ConferencesActionType> {
  readonly type = ConferencesActionType.CreateConferenceSuccess;
  constructor(public payload: { createdConference: IConference }) {}
}

export class CreateConferenceError implements Action<ConferencesActionType> {
  readonly type = ConferencesActionType.CreateConferenceError;
  constructor(public payload: { error: ApiError }) {}
}

export class UpdateConference implements Action<ConferencesActionType> {
  readonly type = ConferencesActionType.UpdateConference;
  constructor(public payload: { conferenceId: string; values: IConferenceForm }) {}
}

export class UpdateConferenceSuccess implements Action<ConferencesActionType> {
  readonly type = ConferencesActionType.UpdateConferenceSuccess;
  constructor(public payload: { updatedConference: IConference }) {}
}

export class UpdateConferenceError implements Action<ConferencesActionType> {
  readonly type = ConferencesActionType.UpdateConferenceError;
  constructor(public payload: { error: ApiError }) {}
}

export class DeleteConference implements Action<ConferencesActionType> {
  readonly type = ConferencesActionType.DeleteConference;
  constructor(public payload: { conferenceId: string }) {}
}

export class DeleteConferenceSuccess implements Action<ConferencesActionType> {
  readonly type = ConferencesActionType.DeleteConferenceSuccess;
  constructor(public payload: { conferenceId: string }) {}
}

export class DeleteConferenceError implements Action<ConferencesActionType> {
  readonly type = ConferencesActionType.DeleteConferenceError;
  constructor(public payload: { error: ApiError }) {}
}

export type ConferencesAction =
  | CreateConference
  | CreateConferenceSuccess
  | CreateConferenceError
  | UpdateConference
  | UpdateConferenceSuccess
  | UpdateConferenceError
  | GetConferences
  | GetConferencesSuccess
  | GetConferencesError
  | DeleteConference
  | DeleteConferenceSuccess
  | DeleteConferenceError
  | SetConferencesQuery;
