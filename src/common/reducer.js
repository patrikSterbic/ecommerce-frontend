// Main Reducer where we store all reducers

import { combineReducers } from "redux-immutable";

import routerReducer from "./modules/routing/reducer";
import routerParamsReducer from "./modules/routing/reducer.params";
import { reducer } from "redux-form/immutable";

// app reducers

const rootReducer = combineReducers({
  routing: routerReducer,
  routingParams: routerParamsReducer,
  form: reducer
});

export default rootReducer;
