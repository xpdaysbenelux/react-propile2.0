import React, { ReactNode, ReactElement } from 'react';
import { createMemoryHistory, History } from 'history';
import { render as tlRender } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, Store } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createEpicMiddleware } from 'redux-observable';
import createRootReducer from '../_store/rootReducer';
import rootEpic from '../_store/rootEpic';

function renderWithRouter(
  ui: ReactElement,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }), ...renderOptions } = {},
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return <Router history={history}>{children}</Router>;
  }
  return {
    ...tlRender(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
    history,
  };
}

function configureStore(initialState): Store {
  const history: History = createMemoryHistory();
  const epicMiddleware = createEpicMiddleware();

  const plainMapper = () => next => action => next(Object.assign({}, action));

  const store: Store = createStore(
    createRootReducer(history),
    initialState,
    compose(applyMiddleware(plainMapper, epicMiddleware, routerMiddleware(history))),
  );

  epicMiddleware.run(rootEpic);

  return store;
}

function renderWithRedux(ui: ReactElement, { initialState = {}, store = configureStore(initialState), ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return {
    ...tlRender(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
    store,
  };
}

function render(
  ui: ReactElement,
  { initialState = {}, store = configureStore(initialState) } = {},
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router history={history}>{children}</Router>
      </Provider>
    );
  }
  return {
    ...tlRender(ui, {
      wrapper: Wrapper,
    }),
    history,
    store,
  };
}

export { renderWithRouter, renderWithRedux, render };
