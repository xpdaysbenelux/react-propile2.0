import { createSelector } from 'reselect';
import { AppState } from '../../_store/rootReducer';
import { ModalState } from './reducer';

const selectNode = (state: AppState) => state.modal;

export const data = createSelector(selectNode, (state: ModalState) => state.data);
export const isOpen = createSelector(selectNode, (state: ModalState) => state.isOpen);
export const type = createSelector(selectNode, (state: ModalState) => state.type);
