import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  auth,
  googleAuthProvider
} from "firebase/index";
import {
  SIGNIN_GOOGLE_USER,
  SIGNIN_USER,
  SIGNOUT_USER,
  SIGNUP_USER,
  USER_LIST,
  RESET_PASSWORD_LINK
} from "constants/ActionTypes";
import {
  userSignUpSuccess,
  showAuthMessage,
  userSignInSuccess,
  userListSuccess,
  userListFailed,
  userSignOutSuccess
} from "actions/Auth";
import {NotificationManager} from 'react-notifications';

import { apiURL } from "constants/App";
import request from "util/request";

const createUserWithEmailPasswordRequest = async (email, password) =>
  await auth
    .createUserWithEmailAndPassword(email, password)
    .then(authUser => authUser)
    .catch(error => error);

const signInUserWithEmailPasswordRequest = async (email, password) =>
  await auth
    .signInWithEmailAndPassword(email, password)
    .then(async authUser => {
      return authUser;
    })
    .catch(error => error);

const signOutRequest = async () =>
  await auth
    .signOut()
    .then(authUser => authUser)
    .catch(error => error);

const passwordResetRequest = async (email) => {
  console.log("em",email);
  await auth
    .sendPasswordResetEmail(email)
    .then(authUser => {
      console.log("success");
      NotificationManager.success(`A password reset link has been sent. Please check your email.`)
    })
    .catch(error => 
      NotificationManager.error(error.message)
      );
}

function* createUserWithEmailPassword({ payload }) {
  const { email, password, name } = payload;
  try {
    const signUpUser = yield call(
      createUserWithEmailPasswordRequest,
      email,
      password
    );
    if (signUpUser.message) {
      yield put(showAuthMessage(signUpUser.message));
    } else {
      yield appSignIn(signUpUser.user, name);
      localStorage.setItem("user_id", signUpUser.user.uid);
      yield put(userSignUpSuccess(signUpUser.user));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* appSignIn(user, name) {
  debugger;
  const requestURL = `${apiURL}user/authenticate`;
  const body = {
    authUserId: user.uid,
    email: user.email,
    name: user.displayName || name
  };

  user.photoURL && (body['picture'] = user.photoURL);
  try {
    const userData = yield call(request, requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    localStorage.setItem("appUser", JSON.stringify(userData));
    yield put(userSignInSuccess(userData));
  } catch (error) {
    console.log("error",error);
    yield put(showAuthMessage(error));
  }
}

function* signInUserWithEmailPassword({ payload }) {
  const { email, password } = payload;
  try {
    const signInUser = yield call(
      signInUserWithEmailPasswordRequest,
      email,
      password
    );
    if (signInUser.message) {
      yield put(showAuthMessage(signInUser.message));
    } else {
      yield appSignIn(signInUser.user);
      localStorage.setItem("user_id", signInUser.user.uid);
      localStorage.setItem("jwt", signInUser.user._lat);
      yield put(userSignInSuccess(signInUser.user));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* listUserRequest() {
  try {
    const requestURL = `${apiURL}user`;
    const users = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    yield put(userListSuccess(users));
  } catch (error) {
    yield put(userListFailed(error));
  }
}

function* signOut() {
  try {
    const signOutUser = yield call(signOutRequest);
    if (signOutUser === undefined) {
      localStorage.removeItem("user_id");
      localStorage.removeItem("appUser");
      yield put(userSignOutSuccess(signOutUser));
    } else {
      yield put(showAuthMessage(signOutUser.message));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* resetPasswordLinkRequest({payload}) {
  try {
    const passwordReset = yield call(
      passwordResetRequest,
      payload
    );
  } catch (error) {
    // yield put(showAuthMessage(error));
  }
}

export function* createUserAccount() {
  yield takeEvery(SIGNUP_USER, createUserWithEmailPassword);
}

export function* signInUser() {
  yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword);
}

export function* listUser() {
  yield takeEvery(USER_LIST, listUserRequest);
}

export function* signOutUser() {
  yield takeEvery(SIGNOUT_USER, signOut);
}

export function* resetPasswordLink() {
  yield takeEvery(RESET_PASSWORD_LINK, resetPasswordLinkRequest);
}

export default function* rootSaga() {
  yield all([
    fork(createUserAccount),
    fork(signInUser),
    fork(listUser),
    fork(signOutUser),
    fork(resetPasswordLink)
  ]);
}