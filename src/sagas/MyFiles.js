import {all, call, fork, put, takeEvery, takeLatest, delay} from 'redux-saga/effects';

import { apiURL } from 'constants/App';
import request from 'util/request';

import {
  CREATE_FILE_FOLDER,
  LIST_FILE_FOLDER,
  DELETE_FILE_FOLDER,
  EDIT_FILE_FOLDER
} from 'constants/ActionTypes';
import {
  createFileFolderSuccess,
  createFileFolderFailed,
  listFileFolderSuccess,
  listFileFolderFailed,
  deleteFileFolderSuccess,
  deleteFileFolderFailed
} from 'actions/MyFiles';
import {
  showAlertMessage,
  hideAlertMessage
} from "actions/Auth";

function* createFileFolderRequest({ payload }) {
  try {
    const requestURL = `${apiURL}files`;
    const category = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    yield put(createFileFolderSuccess(category));
    if(payload.type === "FILE")
      yield put(showAlertMessage("File uploaded successfully", "success"));
    else
      yield put(showAlertMessage("Folder created successfully", "success"));

    yield delay(3000);
    yield put(hideAlertMessage());
  } catch (error) {
    yield put(showAlertMessage("File/folder create failed", "error"));
    yield delay(3000);
    yield put(hideAlertMessage());
  }
}

function* listFileFolderRequest({ payload }) {
  try {
    console.log(payload)
    let requestURL = `${apiURL}files?`;
    if(payload.type)
      requestURL += "&type=" + payload.type;
    if(payload.parentId)
      requestURL += "&parentId=" + payload.parentId;
    if(payload.container)
      requestURL += "&container=" + payload.container;
    if(payload.containerId)
      requestURL += "&containerId=" + payload.containerId;
    if(payload.category)
      requestURL += "&category=" + payload.category;


    const files = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    yield put(listFileFolderSuccess(files));
  } catch (error) {
    yield put(showAlertMessage("Delete failed", "error"));
    yield delay(3000);
    yield put(hideAlertMessage());
  }
}

function* deleteFileFolderRequest({ payload }) {
  try {
    const requestURL = `${apiURL}files/${payload.id}`;
    const file = yield call(request, requestURL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    yield put(deleteFileFolderSuccess(file));
    if(payload.type === "FILE")
      yield put(showAlertMessage("File deleted successfully", "success"));
    else
      yield put(showAlertMessage("Folder deleted successfully", "success"));

    yield delay(3000);
    yield put(hideAlertMessage());
  } catch (error) {
    yield put(showAlertMessage("Delete failed", "error"));
    yield delay(3000);
    yield put(hideAlertMessage());
  }
}

function* editFileFolderRequest({ payload }) {
  try {
    const requestURL = `${apiURL}files`;
    const file = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    yield put(deleteFileFolderSuccess(file));
    if(payload.type === "FILE")
      yield put(showAlertMessage("File details updated successfully", "success"));

    yield delay(3000);
    yield put(hideAlertMessage());
  } catch (error) {
    yield put(showAlertMessage("File details updation failed", "error"));
    yield delay(3000);
    yield put(hideAlertMessage());
  }
}

export function* createFileFolder() {
  yield takeEvery(CREATE_FILE_FOLDER, createFileFolderRequest);
}

export function* listFileFolder() {
  yield takeLatest(LIST_FILE_FOLDER, listFileFolderRequest);
}

export function* deleteFileFolder() {
  yield takeLatest(DELETE_FILE_FOLDER, deleteFileFolderRequest);
}

export function* editFileFolder() {
  yield takeLatest(EDIT_FILE_FOLDER, editFileFolderRequest);
}

export default function* rootSaga() {
  yield all([
    fork(createFileFolder),
    fork(listFileFolder),
    fork(deleteFileFolder),
    fork(editFileFolder)
  ]);
}