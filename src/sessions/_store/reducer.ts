import { ApiError, HttpMetadataPagingResponse, HttpMetadataQuery } from '../../_http';
import { ISession } from '../_models';
import { SessionsAction, SessionsActionType } from './actions';

export interface SessionsState {
  errorCrudSession?: ApiError;
  isCreateSessionLoading: boolean;
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
    default:
      return state;
  }
}
