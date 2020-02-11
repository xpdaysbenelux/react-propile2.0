import { createStore, applyMiddleware, compose, Store } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createEpicMiddleware } from 'redux-observable';
import { createBrowserHistory, History } from 'history';
import { createLogger } from 'redux-logger';
import createRootReducer, { AppState } from './rootReducer';
import rootEpic from './rootEpic';

export const history: History = createBrowserHistory();

export function configureStore(): Store {
  const epicMiddleware = createEpicMiddleware();

  const logger = createLogger({
    collapsed: true,
    diff: true,
  });

  const plainMapper = () => next => action => next(Object.assign({}, action));

  const store: Store<AppState> = createStore(
    createRootReducer(history),
    compose(applyMiddleware(plainMapper, epicMiddleware, routerMiddleware(history), logger)),
  );

  epicMiddleware.run(rootEpic);

  return store;
}
