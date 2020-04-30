import { ApiError, HttpMetadataPagingResponse, HttpMetadataQuery } from '../../_http';
import { IEvent } from '../_models';
import { EventsAction } from './actions';

export interface EventsState {
  errorCrudEvent?: ApiError;
  events: IEvent[];
  isLoading: boolean;
  metadata?: HttpMetadataPagingResponse;
  query?: HttpMetadataQuery;
}

const initialState: EventsState = {
  events: [],
  isLoading: false,
};

export default function reducer(state = initialState, action: EventsAction): EventsState {
  return initialState;
}
