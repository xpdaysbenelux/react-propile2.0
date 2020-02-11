import { Action } from 'redux';
import { IConfirmationModalData } from '../_models';

export enum ModalActionType {
  CloseModal = '[Modal] CloseModal',
  ShowConfirmationModal = '[Modal] ShowConfirmationModal',
}

export class ShowConfirmationModal implements Action<ModalActionType> {
  readonly type = ModalActionType.ShowConfirmationModal;
  constructor(public payload: IConfirmationModalData) {}
}

export class CloseModal implements Action<ModalActionType> {
  readonly type = ModalActionType.CloseModal;
}

export type ModalAction = ShowConfirmationModal | CloseModal;
