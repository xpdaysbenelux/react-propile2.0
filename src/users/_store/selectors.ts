import { createSelector } from 'reselect';
import { AppState } from '../../_store/rootReducer';
import { UsersState } from './reducer';

const selectNode = (state: AppState) => state.users;

export const users = createSelector(selectNode, (state: UsersState) => state.users);
export const user = (userId: string) =>
  createSelector(selectNode, (state: UsersState) => state.users?.find(user => user.id === userId));
export const metadata = createSelector(selectNode, (state: UsersState) => state.metadata);
export const query = createSelector(selectNode, (state: UsersState) => state.query);
export const errorCrudUser = createSelector(selectNode, (state: UsersState) => state.errorCrudUser);
export const errorDeactivateUser = createSelector(selectNode, (state: UsersState) => state.errorDeactivateUser);
export const errorResendRegisterEmail = createSelector(selectNode, (state: UsersState) => state.errorResendRegisterEmail);
export const isCreateUserLoading = createSelector(selectNode, (state: UsersState) => state.isCreateUserLoading);
export const isGetUsersLoading = createSelector(selectNode, (state: UsersState) => state.isGetUsersLoading);
export const isDeactivateUserLoading = createSelector(selectNode, (state: UsersState) => state.isDeactivateUserLoading);
export const isResendRegisterEmailLoading = createSelector(selectNode, (state: UsersState) => state.isResendRegisterEmailLoading);
export const isUpdateUserLoading = createSelector(selectNode, (state: UsersState) => state.isUpdateUserLoading);
