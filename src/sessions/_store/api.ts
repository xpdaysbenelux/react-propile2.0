import { ISessionForm } from '../_models';
import { HttpClient } from '../../_http';

export function createSession(body: ISessionForm): Promise<void> {
  return HttpClient.post<void>('sessions', body);
}
