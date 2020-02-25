import { ApiError, HttpMetadataPagingResponse, HttpMetadataQuery } from '../../_http';
import { ISession } from '../_models';
import { insertUpdatedData } from '../../_utils/objectHelpers';
import { SessionsAction, SessionsActionType } from './actions';

export interface SessionsState {
  errorCrudSession?: ApiError;
  isCreateSessionLoading?: boolean;
  isUpdateSessionLoading?: boolean;
  metadata?: HttpMetadataPagingResponse;
  query?: HttpMetadataQuery;
  sessions?: ISession[];
}

const initialState: SessionsState = {
  isCreateSessionLoading: false,
};

export default function reducer(state = initialState, action: SessionsAction): SessionsState {
  switch (action.type) {
    case SessionsActionType.CreateSession:
      return {
        ...state,
        errorCrudSession: null,
        isCreateSessionLoading: true,
      };
    case SessionsActionType.CreateSessionSuccess:
      return {
        ...state,
        isCreateSessionLoading: false,
      };
    case SessionsActionType.CreateSessionError:
      return {
        ...state,
        errorCrudSession: action.payload.error,
        isCreateSessionLoading: false,
      };
    case SessionsActionType.UpdateSession:
      return {
        ...state,
        errorCrudSession: null,
        isUpdateSessionLoading: true,
      };
    case SessionsActionType.UpdateSessionSuccess:
      return {
        ...state,
        isUpdateSessionLoading: false,
        sessions: insertUpdatedData(state.sessions, [action.payload.updatedSession]),
      };
    case SessionsActionType.UpdateSessionError:
      return {
        ...state,
        errorCrudSession: action.payload.error,
        isUpdateSessionLoading: false,
      };
    default:
      return state;
  }
}
