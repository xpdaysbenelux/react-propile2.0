import { ICreateSessionForm, IUpdateSessionForm, ISession } from '../_models';
import { HttpClient, HttpPagedResponse } from '../../_http';
import { removeEmptyKeys } from '../../_utils/objectHelpers';

export function getSessions(): Promise<HttpPagedResponse<ISession>> {
  return HttpClient.get<HttpPagedResponse<ISession>>('sessions');
}

export function createSession(body: ICreateSessionForm): Promise<ISession> {
  return HttpClient.post<ISession>('sessions', removeEmptyKeys(body));
}

export function updateSession(sessionId: string, body: IUpdateSessionForm): Promise<ISession> {
  return HttpClient.put<ISession>(`sessions/${sessionId}`, removeEmptyKeys(body));
}
