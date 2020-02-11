import { IUser } from '../_models';
import { ApiError, HttpMetadataPagingResponse, HttpMetadataQuery } from '../../_http';
import { insertUpdatedData } from '../../_utils/objectHelpers';
import { UsersAction, UsersActionType } from './actions';

export interface UsersState {
  errorCrudUser?: ApiError;
  errorDeactivateUser?: ApiError;
  errorResendRegisterEmail?: ApiError;
  isCreateUserLoading?: boolean;
  isDeactivateUserLoading?: boolean;
  isGetUsersLoading?: boolean;
  isResendRegisterEmailLoading?: boolean;
  isUpdateUserLoading?: boolean;
  metadata?: HttpMetadataPagingResponse;
  query?: HttpMetadataQuery;
  users?: IUser[];
}

const initialState: UsersState = {};

export default function reducer(state = initialState, action: UsersAction): UsersState {
  switch (action.type) {
    case UsersActionType.GetUsers:
      return {
        ...state,
        errorCrudUser: null,
        isGetUsersLoading: true,
        metadata: null,
      };
    case UsersActionType.GetUsersSuccess: {
      let currentData = state.users || [];
      if (!action.payload.meta.skip) currentData = []; // Start overnew when the offset was reset
      return {
        ...state,
        isGetUsersLoading: false,
        metadata: action.payload.meta,
        users: insertUpdatedData(currentData, action.payload.data),
      };
    }
    case UsersActionType.GetUsersError:
      return {
        ...state,
        errorCrudUser: action.payload.error,
        isGetUsersLoading: false,
      };
    case UsersActionType.SetUsersQuery:
      return {
        ...state,
        query: action.payload.query,
      };
    case UsersActionType.CreateUser:
      return {
        ...state,
        errorCrudUser: null,
        isCreateUserLoading: true,
      };
    case UsersActionType.CreateUserSuccess:
      return {
        ...state,
        isCreateUserLoading: false,
        users: insertUpdatedData(state.users || [], [action.payload.createdUser]),
      };
    case UsersActionType.CreateUserError:
      return {
        ...state,
        errorCrudUser: action.payload.error,
        isCreateUserLoading: false,
      };
    case UsersActionType.UpdateUser:
      return {
        ...state,
        errorCrudUser: null,
        isUpdateUserLoading: true,
      };
    case UsersActionType.UpdateUserSuccess:
      return {
        ...state,
        isUpdateUserLoading: false,
        users: insertUpdatedData(state.users, [action.payload.updatedUser]),
      };
    case UsersActionType.UpdateUserError:
      return {
        ...state,
        errorCrudUser: action.payload.error,
        isUpdateUserLoading: false,
      };
    case UsersActionType.DeactivateUser:
      return {
        ...state,
        errorDeactivateUser: null,
        isDeactivateUserLoading: action.payload.confirmed,
      };
    case UsersActionType.DeactivateUserSuccess:
      return {
        ...state,
        isDeactivateUserLoading: false,
        users: insertUpdatedData(state.users, [action.payload.updatedUser]),
      };
    case UsersActionType.DeactivateUserError:
      return {
        ...state,
        errorDeactivateUser: action.payload.error,
        isDeactivateUserLoading: false,
      };
    case UsersActionType.ResendRegisterEmail:
      return {
        ...state,
        errorCrudUser: null,
        isResendRegisterEmailLoading: true,
      };
    case UsersActionType.ResendRegisterEmailSuccess:
      return {
        ...state,
        isResendRegisterEmailLoading: false,
        users: insertUpdatedData(state.users, [action.payload.updatedUser]),
      };
    case UsersActionType.ResendRegisterEmailError:
      return {
        ...state,
        errorDeactivateUser: action.payload.error,
        isResendRegisterEmailLoading: false,
      };
    default:
      return state;
  }
}
