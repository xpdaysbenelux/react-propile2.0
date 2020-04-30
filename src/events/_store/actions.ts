import { Action } from 'redux';

import { IEventForm, IEvent } from '../_models';
import { ApiError } from '../../_http';

export enum EventsActionType {
  CreateEvent = '[Events] CreateEvent',
  CreateEventError = '[Events] CreateEventError',
  CreateEventSuccess = '[Events] CreateEventSuccess',
  DeleteEvent = '[Events] DeleteEvent',
  DeleteEventError = '[Events] DeleteEventError',
  DeleteEventSuccess = '[Events] DeleteEventSuccess',
  GetEvents = '[Events] GetEvents',
  GetEventsError = '[Events] GetEventsError',
  GetEventsSuccess = '[Events] GetEventsSuccess',
  SetEventsQuery = '[Events] SetEventsQuery',
  UpdateEvent = '[Events] UpdateEvent',
  UpdateEventError = '[Events] UpdateEventError',
  UpdateEventSuccess = '[Events] UpdateEventSuccess',
}

export class CreateEvent implements Action<EventsActionType> {
  readonly type = EventsActionType.CreateEvent;
  constructor(public payload: { onSuccess?: () => void; values: IEventForm }) {}
}

export class CreateEventSuccess implements Action<EventsActionType> {
  readonly type = EventsActionType.CreateEventSuccess;
  constructor(public payload: { createdEvent: IEvent }) {}
}

export class CreateEventError implements Action<EventsActionType> {
  readonly type = EventsActionType.CreateEventError;
  constructor(public payload: { error: ApiError }) {}
}

export type EventsAction = CreateEvent | CreateEventSuccess | CreateEventError;
