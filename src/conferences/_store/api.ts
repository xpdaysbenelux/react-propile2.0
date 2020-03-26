import { ICreateConferenceForm, IConference } from '../_models';
import { HttpClient, HttpMetadataQuery, HttpPagedResponse } from '../../_http';
import { removeEmptyKeys } from '../../_utils/objectHelpers';
import { getQueryParams } from '../../_utils/queryHelpers';

export function getConferences(query?: HttpMetadataQuery): Promise<HttpPagedResponse<IConference>> {
  return HttpClient.get<HttpPagedResponse<IConference>>(`conferences${getQueryParams(query)}`);
}

export function createConference(body: ICreateConferenceForm): Promise<IConference> {
  return HttpClient.post<IConference>('conferences', removeEmptyKeys(body));
}
