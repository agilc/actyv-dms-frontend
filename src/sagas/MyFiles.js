import {all, call, fork, put, takeEvery, takeLatest} from 'redux-saga/effects';

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
  listFileFolderSuccess,
  deleteFileFolderSuccess,
  editFileFolderSuccess
} from 'actions/MyFiles';

import { showSagaAlert } from 'util/AlertMessage';

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
      yield showSagaAlert("File uploaded successfully", "success");
    else
      yield showSagaAlert("Folder created successfully", "success");
  } catch (error) {
    yield showSagaAlert(error.message, "error");
  }
}

function* listFileFolderRequest({ payload }) {
  try {
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
    yield showSagaAlert(error.message, "error");
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
      yield showSagaAlert("File deleted successfully", "success");
    else
      yield showSagaAlert("Folder deleted successfully", "success");
  } catch (error) {
    yield showSagaAlert(error.message, "error");
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
    yield put(editFileFolderSuccess(file));
    yield showSagaAlert("File details updated successfully", "success");
  } catch (error) {
    yield showSagaAlert(error.message, "error");
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