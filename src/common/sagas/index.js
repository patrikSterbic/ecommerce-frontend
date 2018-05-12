import { isFunction } from "lodash";
import { fork } from "redux-saga/effects";
import uniq from "lodash/uniq";
import { flattenObject } from "../../utils/functions";

// Custom sagas
import * as navigationSagas from "../modules/navigation/sagas";
import * as containerSagas from "../../containers/sagas";

export default function* root() {
  // Combine all exported sagas into array an run them in parallel (array) non-blocking (fork)
  const flattenSagas = uniq(
    Object.values(
      flattenObject({
        navigationSagas,
        containerSagas
      })
    )
  );

  if (process.env.NODE_ENV === "development") {
    console.log("Initializing sagas", flattenSagas);
  }

  const forkedSagas = flattenSagas
    .filter(saga => isFunction(saga))
    .map(saga => fork(saga));
  yield forkedSagas;
}
