import { IProgramForm, IProgram } from '../_models';
import { HttpClient, HttpMetadataQuery, HttpPagedResponse } from '../../_http';
import { removeEmptyKeys } from '../../_utils/objectHelpers';
import { getQueryParams } from '../../_utils/queryHelpers';

export function getPrograms(query?: HttpMetadataQuery): Promise<HttpPagedResponse<IProgram>> {
  return HttpClient.get<HttpPagedResponse<IProgram>>(`programs${getQueryParams(query)}`);
}

export function createProgram(body: IProgramForm): Promise<IProgram> {
  return HttpClient.post<IProgram>('programs', removeEmptyKeys(body));
}

export function updateProgram(programId: string, body: IProgramForm): Promise<IProgram> {
  return HttpClient.put<IProgram>(`programs/${programId}`, body);
}

export function deleteProgram(programId: string): Promise<string> {
  return HttpClient.delete<string>(`programs/${programId}`);
}
