import { HttpClient } from '../../_http';
import { IEventForm, IEvent } from '../_models';

export function createEvent(body: IEventForm): Promise<IEvent> {
  return HttpClient.post<IEvent>('events', body);
}
