import {all, call, fork, put, takeEvery} from 'redux-saga/effects';

import { apiURL } from 'constants/App';
import request from 'util/request';

import {
    LIST_CATEGORIES,
    ADD_CATEGORY,
    EDIT_CATEGORY,
    DELETE_CATEGORY
  } from 'constants/ActionTypes';
import {
    listCategoriesSuccess,
    listCategoriesFailed,
    addCategorySuccess,
    addCategoryFailed,
    editCategorySuccess,
    editCategoryFailed,
    deleteCategorySuccess,
    deleteCategoryFailed
  } from 'actions/Category';
  import { showSagaAlert } from 'util/AlertMessage';

function* listCategoriesRequest() {
  try {
    const requestURL = `${apiURL}category`;
    const categories = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    yield put(listCategoriesSuccess(categories));
  } catch (error) {
    yield put(listCategoriesFailed(error));
    yield showSagaAlert(error.message, "error");
  }
}

function* addCategoryRequest({ payload }) {
  try {
    const requestURL = `${apiURL}category`;
    const category = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    yield put(addCategorySuccess(category));
    yield showSagaAlert("Category created successfully", "success");
    yield listCategoriesRequest();
  } catch (error) {
    yield put(addCategoryFailed(error));
    yield showSagaAlert(error.message, "error");
  }
}

function* editCategoryRequest({ payload }) {
  try {
    const requestURL = `${apiURL}category`;
    const category = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    yield put(editCategorySuccess(category));
    yield showSagaAlert("Category edited successfully", "success");
    yield listCategoriesRequest();
  } catch (error) {
    yield put(editCategoryFailed(error));
    yield showSagaAlert(error.message, "error");
  }
}

function* deleteCategoryRequest({ payload }) {
  try {
    const requestURL = `${apiURL}category/${payload.id}`;
    const category = yield call(request, requestURL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    yield put(deleteCategorySuccess(category));
    yield showSagaAlert("Category deleted successfully", "success");
    yield listCategoriesRequest();
  } catch (error) {
    yield put(deleteCategoryFailed(error));
    yield showSagaAlert(error.message, "error");
  }
}

export function* listCategories() {
  yield takeEvery(LIST_CATEGORIES, listCategoriesRequest);
}

export function* addCategory() {
  yield takeEvery(ADD_CATEGORY, addCategoryRequest);
}

export function* editCategory() {
  yield takeEvery(EDIT_CATEGORY, editCategoryRequest);
}

export function* deleteCategory() {
  yield takeEvery(DELETE_CATEGORY, deleteCategoryRequest);
}

export default function* rootSaga() {
  yield all([
    fork(listCategories),
    fork(addCategory),
    fork(editCategory),
    fork(deleteCategory)
  ]);
}