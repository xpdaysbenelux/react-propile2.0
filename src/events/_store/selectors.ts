import { createSelector } from 'reselect';

import { AppState } from '../../_store/rootReducer';
import { EventsState } from './reducer';

const selectNode = (state: AppState) => state.events;

export const events = createSelector(selectNode, (state: EventsState) => state.events);
export const eventsFromProgram = (programId: string) =>
  createSelector(selectNode, (state: EventsState) => state.events?.filter(event => event.program.id === programId));
export const event = (eventId: string) =>
  createSelector(selectNode, (state: EventsState) => state.events?.find(event => event.id === eventId));
export const metadata = createSelector(selectNode, (state: EventsState) => state.metadata);
export const query = createSelector(selectNode, (state: EventsState) => state.query);
export const errorCrudEvent = createSelector(selectNode, (state: EventsState) => state.errorCrudEvent);
export const isLoading = createSelector(selectNode, (state: EventsState) => state.isLoading);
