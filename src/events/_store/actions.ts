import { type } from 'os';

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

export type EventsAction = null;
