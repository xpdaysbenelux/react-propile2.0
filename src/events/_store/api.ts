import { HttpClient } from '../../_http';
import { IEventForm, IEvent } from '../_models';
import { removeEmptyKeys } from '../../_utils/objectHelpers';

export function createEvent(body: IEventForm): Promise<IEvent> {
  return HttpClient.post<IEvent>('events', removeEmptyKeys(body));
}
