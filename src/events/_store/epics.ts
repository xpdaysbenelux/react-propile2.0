import { Epic } from 'redux-observable';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { toast } from 'react-toastify';

import { eventsActions } from '../../_store/actions';
import { translations } from '../../_translations';
import { EventsActionType } from './actions';
import * as eventsApi from './api';

const createEventEpic$: Epic = actions$ =>
  actions$.ofType(EventsActionType.CreateEvent).pipe(
    switchMap(({ payload }: eventsActions.CreateEvent) =>
      from(eventsApi.createEvent(payload.programId, payload.values)).pipe(
        tap(() => toast.success(translations.getLabel('EVENTS.TOASTER.EVENT_CREATED'))),
        map(createdEvent => new eventsActions.CreateEventSuccess({ createdEvent })),
        catchError(error => of(new eventsActions.CreateEventError({ error }))),
      ),
    ),
  );

const getEventsEpic$: Epic = actions$ =>
  actions$.ofType(EventsActionType.GetEvents).pipe(
    switchMap(({ payload }: eventsActions.GetEvents) =>
      from(eventsApi.getEvents(payload.programId)).pipe(
        map(events => new eventsActions.GetEventsSuccess({ events })),
        catchError(error => of(new eventsActions.GetEventsError({ error }))),
      ),
    ),
  );

export default [createEventEpic$, getEventsEpic$];
