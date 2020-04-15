import { Action } from 'redux';

import { IProgram, IProgramForm } from '../_models';
import { ApiError, HttpMetadataPagingResponse, HttpMetadataQuery } from '../../_http';

export enum ProgramsActionType {
  CreateProgram = '[Programs] CreateProgram',
  CreateProgramError = '[Programs] CreateProgramError',
  CreateProgramSuccess = '[Programs] CreateProgramSuccess',
  DeleteProgram = '[Programs] DeleteProgram',
  DeleteProgramError = '[Programs] DeleteProgramError',
  DeleteProgramSuccess = '[Programs] DeleteProgramSuccess',
  GetPrograms = '[Programs] GetPrograms',
  GetProgramsError = '[Programs] GetProgramsError',
  GetProgramsSuccess = '[Programs] GetProgramsSuccess',
  SetProgramsQuery = '[Programs] SetProgramsQuery',
  UpdateProgram = '[Programs] UpdateProgram',
  UpdateProgramError = '[Programs] UpdateProgramError',
  UpdateProgramSuccess = '[Programs] UpdateProgramSuccess',
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
  constructor(public payload: { values: IProgramForm }) {}
}

export class CreateProgramSuccess implements Action<ProgramsActionType> {
  readonly type = ProgramsActionType.CreateProgramSuccess;
  constructor(public payload: { createdProgram: IProgram }) {}
}

export class CreateProgramError implements Action<ProgramsActionType> {
  readonly type = ProgramsActionType.CreateProgramError;
  constructor(public payload: { error: ApiError }) {}
}

export class UpdateProgram implements Action<ProgramsActionType> {
  readonly type = ProgramsActionType.UpdateProgram;
  constructor(public payload: { programId: string; values: IProgramForm }) {}
}

export class UpdateProgramSuccess implements Action<ProgramsActionType> {
  readonly type = ProgramsActionType.UpdateProgramSuccess;
  constructor(public payload: { updatedProgram: IProgram }) {}
}

export class UpdateProgramError implements Action<ProgramsActionType> {
  readonly type = ProgramsActionType.UpdateProgramError;
  constructor(public payload: { error: ApiError }) {}
}

export class DeleteProgram implements Action<ProgramsActionType> {
  readonly type = ProgramsActionType.DeleteProgram;
  constructor(public payload: { programId: string }) {}
}

export class DeleteProgramSuccess implements Action<ProgramsActionType> {
  readonly type = ProgramsActionType.DeleteProgramSuccess;
  constructor(public payload: { programId: string }) {}
}

export class DeleteProgramError implements Action<ProgramsActionType> {
  readonly type = ProgramsActionType.DeleteProgramError;
  constructor(public payload: { error: ApiError }) {}
}

export type ProgramsAction =
  | CreateProgram
  | CreateProgramSuccess
  | CreateProgramError
  | UpdateProgram
  | UpdateProgramSuccess
  | UpdateProgramError
  | GetPrograms
  | GetProgramsSuccess
  | GetProgramsError
  | DeleteProgram
  | DeleteProgramSuccess
  | DeleteProgramError
  | SetProgramsQuery;
