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
      from(eventsApi.createEvent(payload.values)).pipe(
        tap(() => toast.success(translations.getLabel('EVENTS.TOASTER.EVENT_CREATED'))),
        map(createdEvent => new eventsActions.CreateEventSuccess({ createdEvent })),
        catchError(error => of(new eventsActions.CreateEventError({ error }))),
      ),
    ),
  );

export default [createEventEpic$];
