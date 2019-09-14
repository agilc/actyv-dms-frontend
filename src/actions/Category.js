import {
  LIST_CATEGORIES, 
  LIST_CATEGORIES_SUCCESS, 
  LIST_CATEGORIES_FAILED, 
  ADD_CATEGORY, 
  ADD_CATEGORY_SUCCESS, 
  ADD_CATEGORY_FAILED,
  EDIT_CATEGORY,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_FAILED,
  DELETE_CATEGORY,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILED
} from 'constants/ActionTypes';

export const listCategories = (data) => {
  return {
    type: LIST_CATEGORIES,
    payload: data
  };
};

export const listCategoriesSuccess = (data) => {
  return {
    type: LIST_CATEGORIES_SUCCESS,
    payload: data
  };
};

export const listCategoriesFailed = (data) => {
  return {
    type: LIST_CATEGORIES_FAILED,
    payload: data
  };
};

export const addCategory = (data) => {
  return {
    type: ADD_CATEGORY,
    payload: data
  };
};

export const addCategorySuccess = (data) => {
  return {
    type: ADD_CATEGORY_SUCCESS,
    payload: data
  };
};

export const addCategoryFailed = (data) => {
  return {
    type: ADD_CATEGORY_FAILED,
    payload: data
  };
};

export const editCategory = (data) => {
  return {
    type: EDIT_CATEGORY,
    payload: data
  };
};

export const editCategorySuccess = (data) => {
  return {
    type: EDIT_CATEGORY_SUCCESS,
    payload: data
  };
};

export const editCategoryFailed = (data) => {
  return {
    type: EDIT_CATEGORY_FAILED,
    payload: data
  };
};

export const deleteCategory = (id) => {
  return {
    type: DELETE_CATEGORY,
    payload: id
  };
};

export const deleteCategorySuccess = (data) => {
  return {
    type: DELETE_CATEGORY_SUCCESS,
    payload: data
  };
};

export const deleteCategoryFailed = (data) => {
  return {
    type: DELETE_CATEGORY_FAILED,
    payload: data
  };
};
