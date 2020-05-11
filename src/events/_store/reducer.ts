import { ApiError } from '../../_http';
import { IEvent } from '../_models';
import { insertUpdatedData } from '../../_utils/objectHelpers';
import { EventsAction, EventsActionType } from './actions';

export interface EventsState {
  errorCrudEvent?: ApiError;
  events: IEvent[];
  isLoading: boolean;
}

const initialState: EventsState = {
  events: [],
  isLoading: false,
};

export default function reducer(state = initialState, action: EventsAction): EventsState {
  switch (action.type) {
    case EventsActionType.CreateEvent:
      return {
        ...state,
        errorCrudEvent: null,
        isLoading: true,
      };
    case EventsActionType.CreateEventSuccess:
      return {
        ...state,
        events: insertUpdatedData(state.events || [], [action.payload.createdEvent]),
        isLoading: false,
      };
    case EventsActionType.CreateEventError:
      return {
        ...state,
        errorCrudEvent: action.payload.error,
        isLoading: false,
      };
    case EventsActionType.GetEvents:
      return {
        ...state,
        errorCrudEvent: null,
        isLoading: true,
      };
    case EventsActionType.GetEventsSuccess:
      return {
        ...state,
        events: action.payload.events,
        isLoading: false,
      };
    case EventsActionType.GetEventsError:
      return {
        ...state,
        errorCrudEvent: action.payload.error,
        isLoading: false,
      };
    case EventsActionType.UpdateEvent:
      return {
        ...state,
        errorCrudEvent: null,
        isLoading: true,
      };
    case EventsActionType.UpdateEventSuccess:
      return {
        ...state,
        events: insertUpdatedData(state.events, [action.payload.updatedEvent]),
        isLoading: false,
      };
    case EventsActionType.UpdateEventError:
      return {
        ...state,
        errorCrudEvent: action.payload.error,
        isLoading: false,
      };
    default:
      return state;
  }
}
