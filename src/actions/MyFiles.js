import {
  CREATE_FILE_FOLDER,
  CREATE_FILE_FOLDER_SUCCESS,
  CREATE_FILE_FOLDER_FAILED,
  LIST_FILE_FOLDER,
  LIST_FILE_FOLDER_SUCCESS,
  LIST_FILE_FOLDER_FAILED,
  DELETE_FILE_FOLDER,
  DELETE_FILE_FOLDER_SUCCESS,
  DELETE_FILE_FOLDER_FAILED
} from 'constants/ActionTypes';

export const createFileFolder = (data) => {
  return {
    type: CREATE_FILE_FOLDER,
    payload: data
  };
};

export const createFileFolderSuccess = (data) => {
  return {
    type: CREATE_FILE_FOLDER_SUCCESS,
    payload: data
  };
};

export const createFileFolderFailed = (data) => {
  return {
    type: CREATE_FILE_FOLDER_FAILED,
    payload: data
  };
};

export const listFileFolder = (data) => {
  return {
    type: LIST_FILE_FOLDER,
    payload: data
  };
};

export const listFileFolderSuccess = (data) => {
  return {
    type: LIST_FILE_FOLDER_SUCCESS,
    payload: data
  };
};

export const listFileFolderFailed = (data) => {
  return {
    type: LIST_FILE_FOLDER_FAILED,
    payload: data
  };
};

export const deleteFileFolder = (data) => {
  return {
    type: DELETE_FILE_FOLDER,
    payload: data
  };
};

export const deleteFileFolderSuccess = (data) => {
  return {
    type: DELETE_FILE_FOLDER_SUCCESS,
    payload: data
  };
};

export const deleteFileFolderFailed = (data) => {
  return {
    type: DELETE_FILE_FOLDER_FAILED,
    payload: data
  };
};