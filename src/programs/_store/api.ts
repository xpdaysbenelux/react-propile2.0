import { ICreateProgramForm, IProgram } from '../_models';
import { HttpClient, HttpMetadataQuery, HttpPagedResponse } from '../../_http';
import { removeEmptyKeys } from '../../_utils/objectHelpers';
import { getQueryParams } from '../../_utils/queryHelpers';

export function getPrograms(query?: HttpMetadataQuery): Promise<HttpPagedResponse<IProgram>> {
  return HttpClient.get<HttpPagedResponse<IProgram>>(`programs${getQueryParams(query)}`);
}

export function createProgram(body: ICreateProgramForm): Promise<IProgram> {
  return HttpClient.post<IProgram>('programs', removeEmptyKeys(body));
}
