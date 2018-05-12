import querystring from 'querystring';
import { NAVIGATE } from './constants';

/**
 * Action request navigation to specific path
 * @param  {string} pathname  Path of navigation
 * @param  {object} query  Query string / object
 */
export function navigate(pathname, query = null) {
  if (pathname.indexOf('?') !== -1) {
    const splittedPathname = pathname.split('?');

    if (splittedPathname.length > 0) {
      const parsedQuery = querystring.parse(splittedPathname[1]);

      if (query == null) {
        query = parsedQuery; 
      } else {
        query = { 
          ...query,
          ...parsedQuery
        };
      }
      pathname = splittedPathname[0];
    }
  }

  return {
    type: NAVIGATE,
    payload: { pathname, query }
  };
}
