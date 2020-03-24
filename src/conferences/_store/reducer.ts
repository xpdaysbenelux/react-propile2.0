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
    default:
      return state;
  }
}