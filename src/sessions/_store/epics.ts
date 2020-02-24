import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, tap, catchError, switchMap, exhaustMap } from 'rxjs/operators';
import { toast } from 'react-toastify';
import { push } from 'connected-react-router';
import { sessionsActions } from '../../_store/actions';
import { translations } from '../../_translations';
import { SessionsActionType } from './actions';
import * as sessionsApi from './api';

const createSessionEpic$: Epic = action$ =>
  action$.ofType(SessionsActionType.CreateSession).pipe(
    exhaustMap(({ payload }: sessionsActions.CreateSession) =>
      from(sessionsApi.createSession(payload.values)).pipe(
        tap(() => toast.success(translations.getLabel('SESSIONS.TOASTER.SESSION_CREATED'))),
        map(() => new sessionsActions.CreateSessionSuccess()),
        catchError(error => of(new sessionsActions.CreateSessionError({ error }))),
      ),
    ),
  );

const createSessionSuccessEpic$: Epic = action$ =>
  action$.ofType(SessionsActionType.CreateSessionSuccess).pipe(switchMap(() => of(push('/sessions'))));

export default [createSessionEpic$, createSessionSuccessEpic$];
