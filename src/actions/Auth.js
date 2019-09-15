import {
  INIT_URL,
  SIGNIN_GOOGLE_USER,
  SIGNIN_GOOGLE_USER_SUCCESS,
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER,
  SIGNOUT_USER_SUCCESS, 
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SHOW_AUTH_MESSAGE,
  USER_LIST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILED,
  RESET_PASSWORD_LINK
} from 'constants/ActionTypes';

export const userSignUp = (user) => {
  return {
    type: SIGNUP_USER,
    payload: user
  };
};

export const userSignUpSuccess = (authUser) => {
  return {
    type: SIGNUP_USER_SUCCESS,
    payload: authUser
  };
};

export const userSignIn = (user) => {
  return {
    type: SIGNIN_USER,
    payload: user
  };
};

export const userSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: authUser
  }
};

export const showAuthMessage = (message) => {
  return {
    type: SHOW_AUTH_MESSAGE,
    payload: message
  };
};

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};

export const getUserList = () => {
  return {
    type: USER_LIST
  }
};

export const userListSuccess = (users) => {
  return {
    type: USER_LIST_SUCCESS,
    payload: users
  };
};

export const userListFailed = () => {
  return {
    type: USER_LIST_FAILED
  };
};

export const userSignOut = () => {
  return {
    type: SIGNOUT_USER
  };
};
export const userSignOutSuccess = (authUser) => {
  return {
    type: SIGNOUT_USER_SUCCESS,
    payload: authUser
  };
};
export const appPasswordReset = (email) => {
  return {
    type: RESET_PASSWORD_LINK,
    payload: email
  };
};
