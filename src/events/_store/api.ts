import { HttpClient } from '../../_http';
import { IEventForm, IEvent } from '../_models';

export function createEvent(programId: string, body: IEventForm): Promise<IEvent> {
  return HttpClient.post<IEvent>(`programs/${programId}/events`, body);
}
