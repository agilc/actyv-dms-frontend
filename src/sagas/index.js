import {all} from 'redux-saga/effects';
import authSagas from './Auth';
import categorySagas from './Category';
import departmentSaga from './Department';
import myfilesSaga from './MyFiles';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    categorySagas(),
    departmentSaga(),
    myfilesSaga()
  ]);
}
