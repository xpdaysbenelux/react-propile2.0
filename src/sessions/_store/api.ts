import { ICreateSessionForm } from '../_models';
import { HttpClient } from '../../_http';

export function createSession(body: ICreateSessionForm): Promise<void> {
  return HttpClient.post<void>('sessions', body);
}
