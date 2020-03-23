import { Action } from 'redux';

import { ICreateConferenceForm, IConference } from '../_models';
import { ApiError } from '../../_http';

export enum ConferencesActionType {
  CreateConference = '[Conferences] CreateConference',
  CreateConferenceError = '[Conferences] CreateConferenceError',
  CreateConferenceSuccess = '[Conferences] CreateConferenceSuccess',
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

export type ConferencesAction = CreateConference | CreateConferenceSuccess | CreateConferenceError;
