import { ApiError } from '../../_http';
import { AuthAction, AuthActionType } from './actions';

export interface AuthState {
  errorChoosePassword?: ApiError;
  errorLogin?: ApiError;
  errorLogout?: ApiError;
  errorRequestPasswordReset?: ApiError;
  isAuthenticateLoading: boolean;
  isChoosePasswordLoading?: boolean;
  isLoginLoading?: boolean;
  isLogoutLoading?: boolean;
  isRequestPasswordResetLoading?: boolean;
}

const initialState: AuthState = {
  isAuthenticateLoading: true,
};

export default function reducer(state = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionType.ChoosePassword:
      return {
        ...state,
        errorChoosePassword: null,
        isChoosePasswordLoading: true,
      };
    case AuthActionType.ChoosePasswordSuccess:
      return {
        ...state,
        isChoosePasswordLoading: false,
      };
    case AuthActionType.ChoosePasswordError:
      return {
        ...state,
        errorChoosePassword: action.payload.error,
        isChoosePasswordLoading: false,
      };
    case AuthActionType.Login:
      return {
        ...state,
        errorLogin: null,
        isLoginLoading: true,
      };
    case AuthActionType.LoginError:
      return {
        ...state,
        errorLogin: action.payload.error,
        isLoginLoading: false,
      };
    case AuthActionType.Authenticate:
      return {
        ...state,
        isAuthenticateLoading: true,
      };
    case AuthActionType.AuthenticateSuccess:
      return {
        ...state,
        isAuthenticateLoading: false,
      };
    case AuthActionType.AuthenticateError:
      return {
        ...state,
        isAuthenticateLoading: false,
      };
    case AuthActionType.Logout:
      return {
        ...state,
        errorLogout: null,
        isLogoutLoading: true,
      };
    case AuthActionType.LogoutSuccess:
      return {
        ...state,
        isAuthenticateLoading: false,
        isLogoutLoading: false,
      };
    case AuthActionType.LogoutError:
      return {
        ...state,
        errorLogout: action.payload.error,
        isLogoutLoading: false,
      };
    case AuthActionType.RequestPasswordReset:
      return {
        ...state,
        errorRequestPasswordReset: null,
        isRequestPasswordResetLoading: true,
      };
    case AuthActionType.RequestPasswordResetSuccess:
      return {
        ...state,
        isRequestPasswordResetLoading: false,
      };
    case AuthActionType.RequestPasswordResetError:
      return {
        ...state,
        errorRequestPasswordReset: action.payload.error,
        isRequestPasswordResetLoading: false,
      };
    default:
      return state;
  }
}
