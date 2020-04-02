import { createSelector } from 'reselect';

import { AppState } from '../../_store/rootReducer';
import { ProgramsState } from './reducer';

const selectNode = (state: AppState) => state.programs;

export const programs = createSelector(selectNode, (state: ProgramsState) => state.programs);
export const programsFromConference = (conferenceId: string) =>
  createSelector(selectNode, (state: ProgramsState) => state.programs?.find(program => program.conference.id === conferenceId));
export const program = (programId: string) =>
  createSelector(selectNode, (state: ProgramsState) => state.programs?.find(program => program.id === programId));
export const metadata = createSelector(selectNode, (state: ProgramsState) => state.metadata);
export const query = createSelector(selectNode, (state: ProgramsState) => state.query);
export const errorCrudProgram = createSelector(selectNode, (state: ProgramsState) => state.errorCrudProgram);
export const isLoading = createSelector(selectNode, (state: ProgramsState) => state.isLoading);
