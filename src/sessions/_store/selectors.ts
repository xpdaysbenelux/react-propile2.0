import { createSelector } from 'reselect';
import { AppState } from '../../_store/rootReducer';
import { SessionsState } from './reducer';

const selectNode = (state: AppState) => state.sessions;

export const sessions = createSelector(selectNode, (state: SessionsState) => state.sessions);
export const sessionsFromUser = (userId: string) =>
  createSelector(selectNode, (state: SessionsState) =>
    state.sessions?.filter(session => session.firstPresenter.id === userId || session.secondPresenter?.id === userId),
  );
export const session = (sessionId: string) =>
  createSelector(selectNode, (state: SessionsState) => state.sessions?.find(session => session.id === sessionId));
export const metadata = createSelector(selectNode, (state: SessionsState) => state.metadata);
export const query = createSelector(selectNode, (state: SessionsState) => state.query);
export const errorCrudSession = createSelector(selectNode, (state: SessionsState) => state.errorCrudSession);
export const isLoading = createSelector(selectNode, (state: SessionsState) => state.isLoading);
