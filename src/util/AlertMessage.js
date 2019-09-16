import {all, call, fork, put, takeEvery, delay} from 'redux-saga/effects';
import {
  showAlertMessage,
  hideAlertMessage
} from "actions/Auth";

export function* showSagaAlert(message,type){
  yield put(showAlertMessage(message,type));
  yield delay(3000);
  yield put(hideAlertMessage());
}

// module.exports.showSagaAlert = showSagaAlert;