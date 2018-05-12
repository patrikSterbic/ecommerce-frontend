import jwtDecode from 'jwt-decode';

function looslyEquals(first, second) {
  /* eslint-disable eqeqeq */
  if ((first || '') == (second || '')) {
    return true;
  }
  /* eslint-enable eqeqeq */

  if (first === null && second !== null) {
    return false;
  }
  if (first !== null && second === null) {
    return false;
  }
  if (first === null && second === null) {
    return true;
  }
  if (first === undefined && second !== undefined) {
    return false;
  }
  if (first !== undefined && second === undefined) {
    return false;
  }
  if (first === undefined && second === undefined) {
    return true;
  }
  if (first && !second) {
    return false;
  }
  if (!first && second) {
    return false;
  }
  return first === second;
}

export function shouldRehydrateUserToken(currentToken, userInfo) {
  if (!currentToken) {
    throw new Error('"currentToken" parameter is required');
  }
  if (!userInfo) {
    throw new Error('"userInfo" parameter is required');
  }

  const decodedToken = jwtDecode(currentToken);

  if (!decodedToken) {
    return false;
  }
  return false;
}
