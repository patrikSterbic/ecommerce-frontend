import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { SET_ROUTING_PARAMS } from './constants';


const initialState = fromJS({
  pathname: null,
  params: {}
});

export default (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      if (state.get('pathname') !== action.payload.pathname) {
        return initialState;
      }
      return state;
    case SET_ROUTING_PARAMS:
      return state.merge({
        pathname: action.payload.pathname,
        params: action.payload.params,
      });
    default:
      return state;
  }
};
