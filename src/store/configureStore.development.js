import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../common/reducer';
import createSagaMiddleware from 'redux-saga';

// Sagas
import sagaMonitor from '../common/sagas/monitor';
import rootSaga from '../common/sagas/';

// Actions
import * as containerActions from '../containers/actions';
import * as commonActions from '../common/actions/';

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const actionCreators = {
  ...containerActions,
  ...commonActions
};
const logger = createLogger({
  level: 'info',
  collapsed: true
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    actionCreators,
  }) :
  compose;
const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware, logger)
);

export default function configureSotre(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../common/reducer', () => {
      store.replaceReducer(rootReducer);
    });
  }
  sagaMiddleware.run(rootSaga);

  return store;
}

