import {
  INIT_URL,
  SHOW_MESSAGE,
  HIDE_MESSAGE,
  SIGNUP_USER_SUCCESS,
  SIGNIN_USER_SUCCESS,
  USER_LIST_SUCCESS,
  USER_LIST_FAILED,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER,
  RESET_PASSWORD_LINK_FAILED
} from "constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  alertMessage: '',
  showMessage: false,
  errorMessage: '',
  messageType:'',
  initURL: '',
  authUser: localStorage.getItem('user_id'),
  appUser: JSON.parse(localStorage.getItem('appUser')),
  authFetchedIndicators: {
    signUp: false
  }
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case INIT_URL: {
      return {
        ...state,
        initURL: action.payload
      }
    }
    case SHOW_MESSAGE: {
      return {
        ...state,
        alertMessage: action.message,
        showMessage: true,
        loader: false,
        messageType: action.messageType
      }
    }
    case HIDE_MESSAGE: {
      return {
        ...state,
        showMessage: false
      }
    }
    case SIGNUP_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload,
        authFetchedIndicators: {
          ...state.authFetchedIndicators,
          signUp: true
        }
      }
    }
    case SIGNUP_USER: {
      return {
        ...state,
        loader: false,
        authUser: action.payload._id,
        authFetchedIndicators: {
          ...state.authFetchedIndicators,
          signUp: false
        }
      }
    }
    case SIGNIN_USER_SUCCESS: {
      return {
        ...state,
        loader: true,
        initURL: '/',
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
    case RESET_PASSWORD_LINK_FAILED: {
      return {
        ...state,
        errorMessage: action.error.payload.message
      }
    }
    default:
      return state;
  }
}
