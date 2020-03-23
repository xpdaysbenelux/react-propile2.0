import { ICreateConferenceForm, IConference } from '../_models';
import { HttpClient } from '../../_http';
import { removeEmptyKeys } from '../../_utils/objectHelpers';

export function createConference(body: ICreateConferenceForm): Promise<IConference> {
  return HttpClient.post<IConference>('conferences', removeEmptyKeys(body));
}
