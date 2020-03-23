import { createSelector } from 'reselect';
import { AppState } from '../../_store/rootReducer';
import { ConferencesState } from './reducer';

const selectNode = (state: AppState) => state.conferences;

export const sessions = createSelector(selectNode, (state: ConferencesState) => state.conferences);
export const metadata = createSelector(selectNode, (state: ConferencesState) => state.metadata);
export const query = createSelector(selectNode, (state: ConferencesState) => state.query);
export const errorCrudConference = createSelector(selectNode, (state: ConferencesState) => state.errorCrudConference);
export const isLoading = createSelector(selectNode, (state: ConferencesState) => state.isLoading);
