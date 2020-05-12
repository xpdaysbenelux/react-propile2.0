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
        map(createdEvent => {
          payload.onSuccess?.();
          return new eventsActions.CreateEventSuccess({ createdEvent });
        }),
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

const updateEventEpic$: Epic = action$ =>
  action$.ofType(EventsActionType.UpdateEvent).pipe(
    switchMap(({ payload }: eventsActions.UpdateEvent) =>
      from(eventsApi.updateEvent(payload.programId, payload.eventId, payload.values)).pipe(
        tap(() => toast.success(translations.getLabel('EVENTS.TOASTER.EVENT_UPDATED'))),
        map(updatedEvent => {
          payload.onSuccess?.();
          return new eventsActions.UpdateEventSuccess({ updatedEvent });
        }),
        catchError(error => of(new eventsActions.UpdateEventError({ error }))),
      ),
    ),
  );

const deleteEventEpic$: Epic = action$ =>
  action$.ofType(EventsActionType.DeleteEvent).pipe(
    switchMap(({ payload }: eventsActions.DeleteEvent) =>
      from(eventsApi.deleteEvent(payload.eventId, payload.programId)).pipe(
        tap(() => toast.success(translations.getLabel('EVENTS.TOASTER.EVENT_DELETED'))),
        map(eventId => {
          payload.onSuccess?.();
          return new eventsActions.DeleteEventSuccess({ eventId });
        }),
        catchError(error => of(new eventsActions.DeleteEventError({ error }))),
      ),
    ),
  );

export default [createEventEpic$, getEventsEpic$, updateEventEpic$, deleteEventEpic$];
