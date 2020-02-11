import { IProfile } from '../_models';
import { AuthAction, AuthActionType } from '../../auth/_store/actions';

export interface ProfileState {
  profile?: IProfile;
}

const initialState: ProfileState = {};

export default function reducer(state = initialState, action: AuthAction): ProfileState {
  switch (action.type) {
    case AuthActionType.Login:
    case AuthActionType.Authenticate:
    case AuthActionType.LogoutSuccess:
      return {
        ...state,
        profile: null,
      };
    case AuthActionType.AuthenticateSuccess:
      return {
        ...state,
        profile: action.payload.profile,
      };
    default:
      return state;
  }
}
