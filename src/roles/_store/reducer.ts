import { IRole } from '../_models';
import { ApiError, HttpMetadataPagingResponse, HttpMetadataQuery } from '../../_http';
import { insertUpdatedData } from '../../_utils/objectHelpers';
import { RolesAction, RolesActionType } from './actions';

export interface RolesState {
  errorCrudRoles?: ApiError;
  isCreateRoleLoading?: boolean;
  isDeleteRoleLoading?: boolean;
  isGetRolesLoading?: boolean;
  isUpdateRoleLoading?: boolean;
  metadata?: HttpMetadataPagingResponse;
  query?: HttpMetadataQuery;
  roles?: IRole[];
}

const initialState: RolesState = {};

export default function reducer(state = initialState, action: RolesAction): RolesState {
  switch (action.type) {
    case RolesActionType.GetRoles:
      return {
        ...state,
        errorCrudRoles: null,
        isGetRolesLoading: true,
        metadata: null,
      };
    case RolesActionType.GetRolesSuccess: {
      let currentData = state.roles || [];
      if (!action.payload.meta.skip) currentData = []; // Start overnew when the offset was reset
      return {
        ...state,
        isGetRolesLoading: false,
        metadata: action.payload.meta,
        roles: insertUpdatedData(currentData, action.payload.data),
      };
    }
    case RolesActionType.GetRolesError:
      return {
        ...state,
        errorCrudRoles: action.payload.error,
        isGetRolesLoading: false,
      };
    case RolesActionType.SetRolesQuery:
      return {
        ...state,
        query: action.payload.query,
      };
    case RolesActionType.CreateRole:
      return {
        ...state,
        errorCrudRoles: null,
        isCreateRoleLoading: true,
      };
    case RolesActionType.CreateRoleSuccess:
      return {
        ...state,
        isCreateRoleLoading: false,
        roles: insertUpdatedData(state.roles || [], [action.payload.createdRole]),
      };
    case RolesActionType.CreateRoleError:
      return {
        ...state,
        errorCrudRoles: action.payload.error,
        isCreateRoleLoading: false,
      };
    case RolesActionType.UpdateRole:
      return {
        ...state,
        errorCrudRoles: null,
        isUpdateRoleLoading: true,
      };
    case RolesActionType.UpdateRoleSuccess:
      return {
        ...state,
        isUpdateRoleLoading: false,
        roles: insertUpdatedData(state.roles, [action.payload.updatedRole]),
      };
    case RolesActionType.UpdateRoleError:
      return {
        ...state,
        errorCrudRoles: action.payload.error,
        isUpdateRoleLoading: false,
      };
    case RolesActionType.DeleteRole:
      return {
        ...state,
        errorCrudRoles: null,
        isDeleteRoleLoading: action.payload.confirmed,
      };
    case RolesActionType.DeleteRoleSuccess:
      return {
        ...state,
        isDeleteRoleLoading: false,
        roles: [...state.roles.filter(role => role.id !== action.payload.roleId)],
      };
    case RolesActionType.DeleteRoleError:
      return {
        ...state,
        errorCrudRoles: action.payload.error,
        isDeleteRoleLoading: false,
      };
    default:
      return state;
  }
}
