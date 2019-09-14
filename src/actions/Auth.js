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
  SHOW_AUTH_MESSAGE
} from 'constants/ActionTypes';

export const userSignUp = (user) => {
  alert();
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
