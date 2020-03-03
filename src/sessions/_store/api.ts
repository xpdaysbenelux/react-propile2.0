import { ICreateSessionForm, IUpdateSessionForm, ISession } from '../_models';
import { HttpClient, HttpPagedResponse } from '../../_http';
import { removeEmptyKeys } from '../../_utils/objectHelpers';

export function getSessions(userId: string): Promise<HttpPagedResponse<ISession>> {
  return HttpClient.get<HttpPagedResponse<ISession>>(`sessions/${userId}`);
}

export function createSession(body: ICreateSessionForm): Promise<void> {
  return HttpClient.post<void>('sessions', body);
}

export function updateSession(sessionId: string, fullBody: IUpdateSessionForm): Promise<ISession> {
  const body = removeEmptyKeys(fullBody);
  body.laptopsRequired = fullBody.laptopsRequired;
  return HttpClient.patch<ISession>(`sessions/${sessionId}`, body);
}
