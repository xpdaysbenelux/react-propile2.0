import { Action } from 'redux';

import { IEventForm, IEvent } from '../_models';
import { ApiError } from '../../_http';

export enum EventsActionType {
  CreateEvent = '[Events] CreateEvent',
  CreateEventError = '[Events] CreateEventError',
  CreateEventSuccess = '[Events] CreateEventSuccess',
  GetEvents = '[Events] GetEvents',
  GetEventsError = '[Events] GetEventsError',
  GetEventsSuccess = '[Events] GetEventsSuccess',
}

export class CreateEvent implements Action<EventsActionType> {
  readonly type = EventsActionType.CreateEvent;
  constructor(public payload: { onSuccess?: () => void; programId: string; values: IEventForm }) {}
}

export class CreateEventSuccess implements Action<EventsActionType> {
  readonly type = EventsActionType.CreateEventSuccess;
  constructor(public payload: { createdEvent: IEvent }) {}
}

export class CreateEventError implements Action<EventsActionType> {
  readonly type = EventsActionType.CreateEventError;
  constructor(public payload: { error: ApiError }) {}
}

export class GetEvents implements Action<EventsActionType> {
  readonly type = EventsActionType.GetEvents;
  constructor(public payload: { programId: string }) {}
}

export class GetEventsSuccess implements Action<EventsActionType> {
  readonly type = EventsActionType.GetEventsSuccess;
  constructor(public payload: { events: IEvent[] }) {}
}

export class GetEventsError implements Action<EventsActionType> {
  readonly type = EventsActionType.GetEventsError;
  constructor(public payload: { error: ApiError }) {}
}

export type EventsAction = CreateEvent | CreateEventSuccess | CreateEventError | GetEvents | GetEventsSuccess | GetEventsError;