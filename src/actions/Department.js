import {
  LIST_DEPARTMENT,
  LIST_DEPARTMENT_SUCCESS,
  LIST_DEPARTMENT_FAILED,
  ADD_DEPARTMENT,
  ADD_DEPARTMENT_SUCCESS,
  ADD_DEPARTMENT_FAILED,
  EDIT_DEPARTMENT,
  EDIT_DEPARTMENT_SUCCESS,
  EDIT_DEPARTMENT_FAILED,
  DELETE_DEPARTMENT,
  DELETE_DEPARTMENT_SUCCESS,
  DELETE_DEPARTMENT_FAILED
} from 'constants/ActionTypes';

export const listDepartment = (userId, adminId) => {
  return {
    type: LIST_DEPARTMENT,
    userId,
    adminId
  };
};

export const listDepartmentSuccess = (data) => {
  return {
    type: LIST_DEPARTMENT_SUCCESS,
    payload: data
  };
};

export const listDepartmentFailed = (data) => {
  return {
    type: LIST_DEPARTMENT_FAILED,
    payload: data
  };
};

export const addDepartment = (data) => {
  return {
    type: ADD_DEPARTMENT,
    payload: data
  };
};

export const addDepartmentSuccess = (data) => {
  return {
    type: ADD_DEPARTMENT_SUCCESS,
    payload: data
  };
};

export const addDepartmentFailed = (data) => {
  return {
    type: ADD_DEPARTMENT_FAILED,
    payload: data
  };
};

export const editDepartment = (data) => {
  return {
    type: EDIT_DEPARTMENT,
    payload: data
  };
};

export const editDepartmentSuccess = (data) => {
  return {
    type: EDIT_DEPARTMENT_SUCCESS,
    payload: data
  };
};

export const editDepartmentFailed = (data) => {
  return {
    type: EDIT_DEPARTMENT_FAILED,
    payload: data
  };
};

export const deleteDepartment = (id) => {
  return {
    type: DELETE_DEPARTMENT,
    payload: id
  };
};

export const deleteDepartmentSuccess = (data) => {
  return {
    type: DELETE_DEPARTMENT_SUCCESS,
    payload: data
  };
};

export const deleteDepartmentFailed = (data) => {
  return {
    type: DELETE_DEPARTMENT_FAILED,
    payload: data
  };
};