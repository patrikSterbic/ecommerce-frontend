import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = fromJS({
  locationBeforeTransitions: null
});

export default (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      if (action.payload && !action.payload.query) {
        action.payload.query = {};
      }

      return state.set('locationBeforeTransitions', fromJS(action.payload));
    default:
      return state;
  }
};
