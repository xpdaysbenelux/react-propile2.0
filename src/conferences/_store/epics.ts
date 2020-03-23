import { Epic } from 'redux-observable';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { push } from 'connected-react-router';

import { toast } from 'react-toastify';
import { conferencesActions } from '../../_store/actions';
import { translations } from '../../_translations';
import { ConferencesActionType } from './actions';
import * as conferencesApi from './api';

const createConferenceEpic$: Epic = actions$ =>
  actions$.ofType(ConferencesActionType.CreateConference).pipe(
    switchMap(({ payload }: conferencesActions.CreateConference) =>
      from(conferencesApi.createConference(payload.values)).pipe(
        tap(() => toast.success(translations.getLabel(''))),
        map(createdConference => new conferencesActions.CreateConferenceSuccess({ createdConference })),
        catchError(error => of(new conferencesActions.CreateConferenceError({ error }))),
      ),
    ),
  );

const createConferenceSuccessEpic$: Epic = action$ =>
  action$.ofType(ConferencesActionType.CreateConferenceSuccess).pipe(switchMap(() => of(push('/conferences/create-program'))));

export default [createConferenceEpic$, createConferenceSuccessEpic$];
