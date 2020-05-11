import { HttpClient } from '../../_http';
import { IEventForm, IEvent } from '../_models';
import { removeEmptyKeys } from '../../_utils/objectHelpers';

export function createEvent(programId: string, body: IEventForm): Promise<IEvent> {
  return HttpClient.post<IEvent>(`programs/${programId}/events`, removeEmptyKeys(body));
}

export function getEvents(programId: string): Promise<IEvent[]> {
  return HttpClient.get<IEvent[]>(`programs/${programId}/events`);
}

export function updateEvent(programId: string, eventId: string, body: IEventForm): Promise<IEvent> {
  console.log(body);
  return HttpClient.put<IEvent>(`programs/${programId}/events/${eventId}`, body);
}
