import { createSelector } from 'reselect';
import { RouterState } from 'connected-react-router';
import { AppState } from '../../_store/rootReducer';

const selectNode = (state: AppState) => state.router;

export const pathname = createSelector(selectNode, (state: RouterState) => state.location.pathname);
