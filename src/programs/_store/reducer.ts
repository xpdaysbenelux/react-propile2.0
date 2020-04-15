import { ApiError, HttpMetadataPagingResponse, HttpMetadataQuery } from '../../_http';
import { IProgram } from '../_models';
import { insertUpdatedData } from '../../_utils/objectHelpers';
import { ProgramsAction, ProgramsActionType } from './actions';

export interface ProgramsState {
  errorCrudProgram?: ApiError;
  isLoading: boolean;
  metadata?: HttpMetadataPagingResponse;
  programs: IProgram[];
  query?: HttpMetadataQuery;
}

const initialState: ProgramsState = {
  isLoading: false,
  programs: [],
};

export default function reducer(state = initialState, action: ProgramsAction): ProgramsState {
  switch (action.type) {
    case ProgramsActionType.GetPrograms:
      return {
        ...state,
        errorCrudProgram: null,
        isLoading: true,
        metadata: null,
      };
    case ProgramsActionType.GetProgramsSuccess: {
      let currentData = state.programs || [];
      if (!action.payload.meta.skip) currentData = [];
      return {
        ...state,
        isLoading: false,
        metadata: action.payload.meta,
        programs: insertUpdatedData(currentData, action.payload.data),
      };
    }
    case ProgramsActionType.GetProgramsError:
      return {
        ...state,
        errorCrudProgram: action.payload.error,
        isLoading: false,
      };
    case ProgramsActionType.SetProgramsQuery:
      return {
        ...state,
        query: action.payload.query,
      };
    case ProgramsActionType.CreateProgram:
      return {
        ...state,
        errorCrudProgram: null,
        isLoading: true,
      };
    case ProgramsActionType.CreateProgramSuccess:
      return {
        ...state,
        isLoading: false,
        programs: insertUpdatedData(state.programs || [], [action.payload.createdProgram]),
      };
    case ProgramsActionType.CreateProgramError:
      return {
        ...state,
        errorCrudProgram: action.payload.error,
        isLoading: false,
      };
    default:
      return state;
  }
}
