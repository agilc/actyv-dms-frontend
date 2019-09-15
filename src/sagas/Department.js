import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import { saveAs } from 'file-saver';

import { apiURL } from 'constants/App';
import request from 'util/request';

import {
    LIST_DEPARTMENT, 
    ADD_DEPARTMENT,
    EDIT_DEPARTMENT,
    DELETE_DEPARTMENT,
    CHECKOUT_FILE,
    CHECKIN_FILE
  } from 'constants/ActionTypes';

import { 
  addDepartmentSuccess, 
  addDepartmentFailed,
  listDepartmentSuccess,
  listDepartmentFailed,
  deleteDepartmentSuccess,
  deleteDepartmentFailed,
  editDepartmentSuccess,
  editDepartmentFailed,
  checkOutFileSuccess,
  checkOutFileFailed,
  checkInFileSuccess,
  checkInFileFailed
} from 'actions/Department';

function* listDepartmentRequest({ userId, adminId }) {
  console.log("lis", userId, adminId);
  try {
    let result = {};
    if(userId){
      const requestURL = `${apiURL}department?userId=${userId}`
      const userDepts = yield call(request, requestURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      result.userDepts = userDepts;
    }

    if(adminId){
      const requestURL = `${apiURL}department?adminId=${adminId}`
      const adminDepts = yield call(request, requestURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      result.adminDepts = adminDepts;
    }

    
    yield put(listDepartmentSuccess(result));
  } catch (error) {
    yield put(listDepartmentFailed(error));
  }
}

function* addDepartmentRequest({ payload }) {
  try {
    const requestURL = `${apiURL}department`;
    const department = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    yield put(addDepartmentSuccess(department));
    yield listDepartmentRequest({userId: payload.createdBy._id, adminId: payload.createdBy._id});
  } catch (error) {
    yield put(addDepartmentFailed(error));
  }
}

function* deleteDepartmentRequest({ payload }) {
  try {
    const requestURL = `${apiURL}department/${payload.id}`;
    const dept = yield call(request, requestURL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    yield put(deleteDepartmentSuccess(dept));
    yield listDepartmentRequest({userId: payload.user._id, adminId: payload.user._id});
  } catch (error) {
    yield put(deleteDepartmentFailed(error));
  }
}

function* editDepartmentRequest({ payload }) {
  try {
    const requestURL = `${apiURL}department`;
    const category = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    yield put(editDepartmentSuccess(category));
  } catch (error) {
    yield put(editDepartmentFailed(error));
  }
}

function* checkOutFileRequest({ payload }) {
  try {
    const requestURL = `${apiURL}files/checkout/${payload}`;
    const file = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    yield put(checkOutFileSuccess(file));
    saveAs(file.url + "?" + Math.random()*100000000000000000, file.name );
  } catch (error) {
    yield put(checkOutFileFailed(error));
  }
}

function* checkInFileRequest({ payload }) {
  try {
    const requestURL = `${apiURL}files/checkin`;
    const file = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    yield put(checkInFileSuccess(file));
  } catch (error) {
    yield put(checkInFileFailed(error));
  }
}

export function* listDepartment() {
  yield takeEvery(LIST_DEPARTMENT, listDepartmentRequest);
}

export function* addDepartment() {
  yield takeEvery(ADD_DEPARTMENT, addDepartmentRequest);
}

export function* editDepartment() {
  yield takeEvery(EDIT_DEPARTMENT, editDepartmentRequest);
}

export function* deleteDepartment() {
  yield takeEvery(DELETE_DEPARTMENT, deleteDepartmentRequest);
}

export function* checkOutFile() {
  yield takeEvery(CHECKOUT_FILE, checkOutFileRequest);
}

export function* checkInFile() {
  yield takeEvery(CHECKIN_FILE, checkInFileRequest);
}

export default function* rootSaga() {
  yield all([
    fork(listDepartment),
    fork(addDepartment),
    fork(editDepartment),
    fork(deleteDepartment),
    fork(checkOutFile),
    fork(checkInFile)
  ]);
}