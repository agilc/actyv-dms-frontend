import {
  INIT_URL,
  SIGNUP_USER_SUCCESS,
  SIGNIN_USER_SUCCESS,
  USER_LIST_SUCCESS,
  USER_LIST_FAILED,
  SIGNOUT_USER_SUCCESS
} from "constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  alertMessage: '',
  showMessage: false,
  errorMessage: '',
  initURL: '',
  authUser: localStorage.getItem('user_id'),
  appUser: JSON.parse(localStorage.getItem('appUser'))
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case INIT_URL: {
      return {
        ...state,
        initURL: action.payload
      }
    }
    case SIGNUP_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload._id
      }
    }
    case SIGNIN_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload,
        appUser: JSON.parse(localStorage.getItem('appUser'))
      }
    }
    case USER_LIST_SUCCESS: {
      return {
        ...state,
        userList: action.payload
      }
    }
    case USER_LIST_FAILED: {
      return {
        ...state,
        errorMessage: action.error.payload.message
      }
    }
    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        authUser: null
      }
    }

    default:
      return state;
  }
}
