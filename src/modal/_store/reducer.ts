import { ModalType, IModalData } from '../_models';
import { ModalActionType, ModalAction } from './actions';

export interface ModalState {
  data?: IModalData;
  isOpen: boolean;
  type?: ModalType;
}

const initialState: ModalState = {
  isOpen: false,
};

const actionTypeToModalType = {
  [ModalActionType.ShowConfirmationModal]: ModalType.Confirmation,
};

export default function reducer(state = initialState, action: ModalAction): ModalState {
  switch (action.type) {
    case ModalActionType.ShowConfirmationModal:
      return {
        ...state,
        data: action.payload,
        isOpen: true,
        type: actionTypeToModalType[action.type],
      };
    case ModalActionType.CloseModal:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
