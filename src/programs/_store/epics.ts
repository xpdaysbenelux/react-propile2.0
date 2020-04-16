import { Epic } from 'redux-observable';
import { switchMap, map, tap, catchError, exhaustMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';

import { programsActions } from '../../_store/actions';
import { translations } from '../../_translations';
import { programsSelectors } from '../../_store/selectors';
import { ProgramsActionType } from './actions';
import * as programsApi from './api';

const getProgramsEpic$: Epic = (action$, state$) =>
  action$.ofType(ProgramsActionType.GetPrograms).pipe(
    exhaustMap(() => {
      const query = programsSelectors.query(state$.value);
      return from(programsApi.getPrograms(query)).pipe(
        map(({ data, meta }) => new programsActions.GetProgramsSuccess({ data, meta })),
        catchError(error => of(new programsActions.GetProgramsError({ error }))),
      );
    }),
  );

const setProgramsQueryEpic$: Epic = action$ =>
  action$.ofType(ProgramsActionType.SetProgramsQuery).pipe(map(() => new programsActions.GetPrograms()));

const createProgramEpic$: Epic = actions$ =>
  actions$.ofType(ProgramsActionType.CreateProgram).pipe(
    switchMap(({ payload }: programsActions.CreateProgram) =>
      from(programsApi.createProgram(payload.values)).pipe(
        tap(() => toast.success(translations.getLabel('PROGRAMS.TOASTER.PROGRAM_CREATED'))),
        map(createdProgram => new programsActions.CreateProgramSuccess({ createdProgram })),
        catchError(error => of(new programsActions.CreateProgramError({ error }))),
      ),
    ),
  );

const createProgramSuccessEpic$: Epic = action$ =>
  action$.ofType(ProgramsActionType.CreateProgramSuccess).pipe(switchMap(() => of(push('/programs/edit-program-events'))));

const updateProgramEpic$: Epic = action$ =>
  action$.ofType(ProgramsActionType.UpdateProgram).pipe(
    exhaustMap(({ payload }: programsActions.UpdateProgram) =>
      from(programsApi.updateProgram(payload.programId, payload.values)).pipe(
        tap(() => toast.success(translations.getLabel('PROGRAMS.TOASTER.CONFERENCE_UPDATED'))),
        map(updatedProgram => new programsActions.UpdateProgramSuccess({ updatedProgram })),
        catchError(error => of(new programsActions.UpdateProgramError({ error }))),
      ),
    ),
  );

const updateProgramSuccessEpic$: Epic = action$ =>
  action$.ofType(ProgramsActionType.UpdateProgramSuccess).pipe(switchMap(() => of(push('/conferences'))));

const deleteProgramEpic$: Epic = action$ =>
  action$.ofType(ProgramsActionType.DeleteProgram).pipe(
    exhaustMap(({ payload }: programsActions.DeleteProgram) =>
      from(programsApi.deleteProgram(payload.programId)).pipe(
        tap(() => toast.success(translations.getLabel('PROGRAMS.TOASTER.PROGRAM_DELETED'))),
        map(programId => new programsActions.DeleteProgramSuccess({ programId })),
        catchError(error => of(new programsActions.DeleteProgramError({ error }))),
      ),
    ),
  );

const crudProgramSuccessEpic$: Epic = action$ =>
  action$
    .ofType(
      ProgramsActionType.CreateProgramSuccess,
      ProgramsActionType.UpdateProgramSuccess,
      ProgramsActionType.DeleteProgramSuccess,
    )
    .pipe(switchMap(() => of(push('/conferences'))));

export default [
  getProgramsEpic$,
  setProgramsQueryEpic$,
  createProgramEpic$,
  updateProgramEpic$,
  deleteProgramEpic$,
  crudProgramSuccessEpic$,
];
