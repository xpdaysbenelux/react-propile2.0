import { Action } from 'redux';

import { ICreateConferenceForm, IConference } from '../_models';
import { ApiError, HttpMetadataPagingResponse, HttpMetadataQuery } from '../../_http';

export enum ConferencesActionType {
  CreateConference = '[Conferences] CreateConference',
  CreateConferenceError = '[Conferences] CreateConferenceError',
  CreateConferenceSuccess = '[Conferences] CreateConferenceSuccess',
  GetConferences = '[Conferences] GetConferences',
  GetConferencesError = '[Conferences] GetConferencesError',
  GetConferencesSuccess = '[Conferences] GetConferencesSuccess',
  SetConferencesQuery = '[Conferences] SetConferencesQuery',
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
  constructor(public payload: { values: ICreateConferenceForm }) {}
}

export class CreateConferenceSuccess implements Action<ConferencesActionType> {
  readonly type = ConferencesActionType.CreateConferenceSuccess;
  constructor(public payload: { createdConference: IConference }) {}
}

export class CreateConferenceError implements Action<ConferencesActionType> {
  readonly type = ConferencesActionType.CreateConferenceError;
  constructor(public payload: { error: ApiError }) {}
}

export type ConferencesAction =
  | CreateConference
  | CreateConferenceSuccess
  | CreateConferenceError
  | GetConferences
  | GetConferencesSuccess
  | GetConferencesError
  | SetConferencesQuery;
