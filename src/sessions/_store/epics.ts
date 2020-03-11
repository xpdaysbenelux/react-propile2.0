import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, tap, catchError, switchMap, exhaustMap } from 'rxjs/operators';
import { toast } from 'react-toastify';
import { push } from 'connected-react-router';
import { sessionsActions } from '../../_store/actions';
import { translations } from '../../_translations';
import { SessionsActionType } from './actions';
import * as sessionsApi from './api';

const getSessionsEpic$: Epic = action$ =>
  action$.ofType(SessionsActionType.GetSessions).pipe(
    exhaustMap(({ payload }: sessionsActions.GetSessions) =>
      from(sessionsApi.getSessions(payload.userId)).pipe(
        map(({ data, meta }) => new sessionsActions.GetSessionsSuccess({ data, meta })),
        catchError(error => of(new sessionsActions.GetSessionsError({ error }))),
      ),
    ),
  );

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

const updateSessionEpic$: Epic = action$ =>
  action$.ofType(SessionsActionType.UpdateSession).pipe(
    exhaustMap(({ payload }: sessionsActions.UpdateSession) =>
      from(sessionsApi.updateSession(payload.sessionId, payload.values)).pipe(
        tap(() => toast.success(translations.getLabel('SESSIONS.TOASTER.SESSION_UPDATED'))),
        map(updatedSession => new sessionsActions.UpdateSessionSuccess({ updatedSession })),
        catchError(error => of(new sessionsActions.UpdateSessionError({ error }))),
      ),
    ),
  );

const updateSessionSuccessEpic$: Epic = action$ =>
  action$.ofType(SessionsActionType.UpdateSessionSuccess).pipe(switchMap(() => of(push('/dashboard'))));

export default [getSessionsEpic$, createSessionEpic$, createSessionSuccessEpic$, updateSessionEpic$, updateSessionSuccessEpic$];
