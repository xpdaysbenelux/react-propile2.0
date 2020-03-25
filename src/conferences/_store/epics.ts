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

const createConferenceSuccessEpic$: Epic = action$ =>
  action$.ofType(ConferencesActionType.CreateConferenceSuccess).pipe(switchMap(() => of(push('/conferences/create-program'))));

export default [getConferencesEpic$, setConferencesQueryEpic$, createConferenceEpic$, createConferenceSuccessEpic$];
