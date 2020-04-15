import { Action } from 'redux';

import { IProgram, ICreateProgramForm } from '../_models';
import { ApiError, HttpMetadataPagingResponse, HttpMetadataQuery } from '../../_http';

export enum ProgramsActionType {
  CreateProgram = '[Programs] CreateProgram',
  CreateProgramError = '[Programs] CreateProgramError',
  CreateProgramSuccess = '[Programs] CreateProgramSuccess',
  GetPrograms = '[Programs] GetPrograms',
  GetProgramsError = '[Programs] GetProgramsError',
  GetProgramsSuccess = '[Programs] GetProgramsSuccess',
  SetProgramsQuery = '[Programs] SetProgramsQuery',
}

export class GetPrograms implements Action<ProgramsActionType> {
  readonly type = ProgramsActionType.GetPrograms;
}

export class GetProgramsSuccess implements Action<ProgramsActionType> {
  readonly type = ProgramsActionType.GetProgramsSuccess;
  constructor(public payload: { data: IProgram[]; meta: HttpMetadataPagingResponse }) {}
}

export class GetProgramsError implements Action<ProgramsActionType> {
  readonly type = ProgramsActionType.GetProgramsError;
  constructor(public payload: { error: ApiError }) {}
}

export class SetProgramsQuery implements Action<ProgramsActionType> {
  readonly type = ProgramsActionType.SetProgramsQuery;
  constructor(public payload: { query: HttpMetadataQuery }) {}
}

export class CreateProgram implements Action<ProgramsActionType> {
  readonly type = ProgramsActionType.CreateProgram;
  constructor(public payload: { values: ICreateProgramForm }) {}
}

export class CreateProgramSuccess implements Action<ProgramsActionType> {
  readonly type = ProgramsActionType.CreateProgramSuccess;
  constructor(public payload: { createdProgram: IProgram }) {}
}

export class CreateProgramError implements Action<ProgramsActionType> {
  readonly type = ProgramsActionType.CreateProgramError;
  constructor(public payload: { error: ApiError }) {}
}

export type ProgramsAction =
  | CreateProgram
  | CreateProgramSuccess
  | CreateProgramError
  | GetPrograms
  | GetProgramsSuccess
  | GetProgramsError
  | SetProgramsQuery;
