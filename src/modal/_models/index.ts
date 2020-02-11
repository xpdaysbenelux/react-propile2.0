import { Action } from 'redux';

export enum ModalType {
  Confirmation = 'CONFIRMATION',
}

export interface IModalData {
  content: string;
  title: string;
}

export interface IConfirmationModalData extends IModalData {
  cancelAction?: () => Action;
  confirmAction?: () => Action;
  confirmText: string;
}
