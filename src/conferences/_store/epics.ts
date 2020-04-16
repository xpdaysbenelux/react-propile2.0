import { Epic } from 'redux-observable';
import { switchMap, map, tap, catchError, exhaustMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';

import { conferencesActions } from '../../_store/actions';
import { translations } from '../../_translations';
import { conferencesSelectors } from '../../_store/selectors';
import { ConferencesActionType } from './actions';
import * as conferencesApi from './api';

const getConferencesEpic$: Epic = (action$, state$) =>
  action$.ofType(ConferencesActionType.GetConferences).pipe(
    exhaustMap(() => {
      const query = conferencesSelectors.query(state$.value);
      return from(conferencesApi.getConferences(query)).pipe(
        map(({ data, meta }) => new conferencesActions.GetConferencesSuccess({ data, meta })),
        catchError(error => of(new conferencesActions.GetConferencesError({ error }))),
      );
    }),
  );

const setConferencesQueryEpic$: Epic = action$ =>
  action$.ofType(ConferencesActionType.SetConferencesQuery).pipe(map(() => new conferencesActions.GetConferences()));

const createConferenceEpic$: Epic = actions$ =>
  actions$.ofType(ConferencesActionType.CreateConference).pipe(
    switchMap(({ payload }: conferencesActions.CreateConference) =>
      from(conferencesApi.createConference(payload.values)).pipe(
        tap(() => toast.success(translations.getLabel('CONFERENCES.TOASTER.CONFERENCE_CREATED'))),
        map(createdConference => new conferencesActions.CreateConferenceSuccess({ createdConference })),
        catchError(error => of(new conferencesActions.CreateConferenceError({ error }))),
      ),
    ),
  );

const updateConferenceEpic$: Epic = action$ =>
  action$.ofType(ConferencesActionType.UpdateConference).pipe(
    exhaustMap(({ payload }: conferencesActions.UpdateConference) =>
      from(conferencesApi.updateConference(payload.conferenceId, payload.values)).pipe(
        tap(() => toast.success(translations.getLabel('CONFERENCES.TOASTER.CONFERENCE_UPDATED'))),
        map(updatedConference => new conferencesActions.UpdateConferenceSuccess({ updatedConference })),
        catchError(error => of(new conferencesActions.UpdateConferenceError({ error }))),
      ),
    ),
  );

const deleteConferenceEpic$: Epic = action$ =>
  action$.ofType(ConferencesActionType.DeleteConference).pipe(
    exhaustMap(({ payload }: conferencesActions.DeleteConference) =>
      from(conferencesApi.deleteConference(payload.conferenceId)).pipe(
        tap(() => toast.success(translations.getLabel('CONFERENCES.TOASTER.CONFERENCE_DELETED'))),
        map(conferenceId => new conferencesActions.DeleteConferenceSuccess({ conferenceId })),
        catchError(error => of(new conferencesActions.DeleteConferenceError({ error }))),
      ),
    ),
  );

const crudConferenceSuccessEpic$: Epic = action$ =>
  action$
    .ofType(
      ConferencesActionType.CreateConferenceSuccess,
      ConferencesActionType.UpdateConferenceSuccess,
      ConferencesActionType.DeleteConferenceSuccess,
    )
    .pipe(switchMap(() => of(push('/conferences'))));

export default [
  getConferencesEpic$,
  setConferencesQueryEpic$,
  createConferenceEpic$,
  updateConferenceEpic$,
  deleteConferenceEpic$,
  crudConferenceSuccessEpic$,
];
