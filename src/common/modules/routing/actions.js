import { SET_ROUTING_PARAMS } from './constants';

export function setRoutingParams(pathname, routingParams) {
  return {
    type: SET_ROUTING_PARAMS,
    payload: {
      pathname, 
      params: routingParams
    }
  };
}