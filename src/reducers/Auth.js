import {
  INIT_URL,
  SIGNUP_USER_SUCCESS,
  SIGNIN_USER_SUCCESS
} from "constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  alertMessage: '',
  showMessage: false,
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
        authUser: action.payload
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
    default:
      return state;
  }
}
