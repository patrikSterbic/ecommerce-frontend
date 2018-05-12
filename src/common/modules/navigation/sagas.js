import { take } from 'redux-saga/effects';

import { NAVIGATE } from './constants';

/**
 * Watcher saga watch requests to browser navigation and triggers a router
 */
function* watchNavigate() {
  while (true) {
    const { payload: { pathname, query } } = yield take(NAVIGATE);

    console.log(pathname, query);
  }
}

export default [
  watchNavigate
];
