/* eslint-disable import/no-extraneous-dependencies */
import { all } from "redux-saga/effects";

import auth from "./auth/sagas";
import csrfToken from "./csrfToken/sagas";

export default function* rootSaga() {
  return yield all([auth, csrfToken]);
}
