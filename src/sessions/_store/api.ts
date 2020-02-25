import { ICreateSessionForm, IUpdateSessionForm, ISession } from '../_models';
import { HttpClient } from '../../_http';
import { removeEmptyKeys } from '../../_utils/objectHelpers';

export function createSession(body: ICreateSessionForm): Promise<void> {
  return HttpClient.post<void>('sessions', body);
}

export function updateSession(sessionId: string, body: IUpdateSessionForm): Promise<ISession> {
  return HttpClient.patch<ISession>(`sessions/${sessionId}`, removeEmptyKeys(body));
}
