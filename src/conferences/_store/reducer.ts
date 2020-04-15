import { ApiError, HttpMetadataPagingResponse, HttpMetadataQuery } from '../../_http';
import { IConference } from '../_models';
import { insertUpdatedData } from '../../_utils/objectHelpers';
import { ConferencesAction, ConferencesActionType } from './actions';

export interface ConferencesState {
  conferences: IConference[];
  errorCrudConference?: ApiError;
  isLoading: boolean;
  metadata?: HttpMetadataPagingResponse;
  query?: HttpMetadataQuery;
}

const initialState: ConferencesState = {
  conferences: [],
  isLoading: false,
};

export default function reducer(state = initialState, action: ConferencesAction): ConferencesState {
  switch (action.type) {
    case ConferencesActionType.GetConferences:
      return {
        ...state,
        errorCrudConference: null,
        isLoading: true,
        metadata: null,
      };
    case ConferencesActionType.GetConferencesSuccess: {
      let currentData = state.conferences || [];
      if (!action.payload.meta.skip) currentData = [];
      return {
        ...state,
        conferences: insertUpdatedData(currentData, action.payload.data),
        isLoading: false,
        metadata: action.payload.meta,
      };
    }
    case ConferencesActionType.GetConferencesError:
      return {
        ...state,
        errorCrudConference: action.payload.error,
        isLoading: false,
      };
    case ConferencesActionType.SetConferencesQuery:
      return {
        ...state,
        query: action.payload.query,
      };
    case ConferencesActionType.CreateConference:
      return {
        ...state,
        errorCrudConference: null,
        isLoading: true,
      };
    case ConferencesActionType.CreateConferenceSuccess:
      return {
        ...state,
        conferences: insertUpdatedData(state.conferences || [], [action.payload.createdConference]),
        isLoading: false,
      };
    case ConferencesActionType.CreateConferenceError:
      return {
        ...state,
        errorCrudConference: action.payload.error,
        isLoading: false,
      };
    case ConferencesActionType.UpdateConference:
      return {
        ...state,
        errorCrudConference: null,
        isLoading: true,
      };
    case ConferencesActionType.UpdateConferenceSuccess:
      return {
        ...state,
        conferences: insertUpdatedData(state.conferences, [action.payload.updatedConference]),
        isLoading: false,
      };
    case ConferencesActionType.UpdateConferenceError:
      return {
        ...state,
        errorCrudConference: action.payload.error,
        isLoading: false,
      };
    default:
      return state;
  }
}
