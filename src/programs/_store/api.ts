import { IProgramForm, IProgram } from '../_models';
import { HttpClient, HttpMetadataQuery, HttpPagedResponse } from '../../_http';
import { getQueryParams } from '../../_utils/queryHelpers';
import { handleProgramFormBeforeSubmit } from '../_utils';

export function getPrograms(query?: HttpMetadataQuery): Promise<HttpPagedResponse<IProgram>> {
  return HttpClient.get<HttpPagedResponse<IProgram>>(`programs${getQueryParams(query)}`);
}

export function createProgram(body: IProgramForm): Promise<IProgram> {
  return HttpClient.post<IProgram>('programs', handleProgramFormBeforeSubmit(body));
}

export function updateProgram(programId: string, body: IProgramForm): Promise<IProgram> {
  return HttpClient.put<IProgram>(`programs/${programId}`, handleProgramFormBeforeSubmit(body));
}

export function deleteProgram(programId: string): Promise<string> {
  return HttpClient.delete<string>(`programs/${programId}`);
}
