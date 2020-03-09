import { ApiError, HttpMetadataPagingResponse, HttpMetadataQuery } from '../../_http';
import { ISession } from '../_models';
import { insertUpdatedData } from '../../_utils/objectHelpers';
import { SessionsAction, SessionsActionType } from './actions';

export interface SessionsState {
  errorCrudSession?: ApiError;
  isLoading: boolean;
  metadata?: HttpMetadataPagingResponse;
  query?: HttpMetadataQuery;
  sessions: ISession[];
}

const initialState: SessionsState = {
  isLoading: false,
  sessions: [],
};

export default function reducer(state = initialState, action: SessionsAction): SessionsState {
  switch (action.type) {
    case SessionsActionType.GetSessions:
      return {
        ...state,
        errorCrudSession: null,
        isLoading: true,
        metadata: null,
      };
    case SessionsActionType.GetSessionsSuccess: {
      let currentData: ISession[] = state.sessions || [];
      if (!action.payload.meta.skip) currentData = []; // Start overnew when the offset was reset
      return {
        ...state,
        isLoading: false,
        metadata: action.payload.meta,
        sessions: insertUpdatedData(currentData, action.payload.data),
      };
    }
    case SessionsActionType.GetSessionsError:
      return {
        ...state,
        errorCrudSession: action.payload.error,
        isLoading: false,
      };
    case SessionsActionType.CreateSession:
      return {
        ...state,
        errorCrudSession: null,
        isLoading: true,
      };
    case SessionsActionType.CreateSessionSuccess:
      return {
        ...state,
        isLoading: false,
      };
    case SessionsActionType.CreateSessionError:
      return {
        ...state,
        errorCrudSession: action.payload.error,
        isLoading: false,
      };
    case SessionsActionType.UpdateSession:
      return {
        ...state,
        errorCrudSession: null,
        isLoading: true,
      };
    case SessionsActionType.UpdateSessionSuccess:
      return {
        ...state,
        isLoading: false,
        sessions: insertUpdatedData(state.sessions, [action.payload.updatedSession]),
      };
    case SessionsActionType.UpdateSessionError:
      return {
        ...state,
        errorCrudSession: action.payload.error,
        isLoading: false,
      };
    default:
      return state;
  }
}
