import { UserState } from '../_models';
import { translations } from '../../_translations';

export function labelForUserState(state: UserState): string {
  return translations.getLabel(`USERS.STATE.OPTIONS.${state}`);
}
