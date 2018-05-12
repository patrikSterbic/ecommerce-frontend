export function getCurrentRoute() {
  const route = (window.location.hash || '');
  return route.replace('#', '');
}

export function dispatchOnEnter(dispatch, actionObject) {
  if (!dispatch) {
    throw new Error('"dispatch" parameter is required');
  }
  if (!actionObject) {
    throw new Error('"actionObject" parameter is required');
  }

  return function doDispatchOnEnter() {
    dispatch(actionObject);
  };
}
