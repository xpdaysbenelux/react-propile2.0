import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers, Reducer, Action } from 'redux';
import rolesReducer, { RolesState } from '../roles/_store/reducer';
import usersReducer, { UsersState } from '../users/_store/reducer';
import sessionsReducer, { SessionsState } from '../sessions/_store/reducer';
import conferencesReducer, { ConferencesState } from '../conferences/_store/reducer';
import authReducer, { AuthState } from '../auth/_store/reducer';
import modalReducer, { ModalState } from '../modal/_store/reducer';
import profileReducer, { ProfileState } from '../profile/_store/reducer';
import programsReducer, { ProgramsState } from '../programs/_store/reducer';
import eventsReducer, { EventsState } from '../events/_store/reducer';
import { AuthActionType } from '../auth/_store/actions';

export interface AppState {
  auth: AuthState;
  conferences: ConferencesState;
  events: EventsState;
  modal: ModalState;
  profile: ProfileState;
  programs: ProgramsState;
  roles: RolesState;
  router: RouterState;
  sessions: SessionsState;
  users: UsersState;
}

function appReducer(history: History): Reducer {
  return combineReducers<AppState>({
    auth: authReducer,
    conferences: conferencesReducer,
    events: eventsReducer,
    modal: modalReducer,
    profile: profileReducer,
    programs: programsReducer,
    roles: rolesReducer,
    router: connectRouter(history),
    sessions: sessionsReducer,
    users: usersReducer,
  });
}

export default (history: History) => (state: AppState, action: Action) => {
  if (action.type === AuthActionType.LogoutSuccess) {
    return appReducer(history)(undefined, action);
  }
  return appReducer(history)(state, action);
};
