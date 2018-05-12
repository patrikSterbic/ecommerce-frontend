import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../common/reducer';

import createSagaMiddleware from 'redux-saga';
import rootSaga from '../common/sagas/index';

const sagaMiddleware = createSagaMiddleware();

const enhancer = applyMiddleware(sagaMiddleware);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);

  return store;
}
