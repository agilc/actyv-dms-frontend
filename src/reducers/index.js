import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import Auth from "./Auth";
// import { SIGNOUT_USER_SUCCESS } from "constants/ActionTypes";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
const appReducer = combineReducers({
  router: connectRouter(history),
  auth: Auth
});

const rootReducer = (state, action) => {
  // if (action && action.type === SIGNOUT_USER_SUCCESS) {
  //   state = undefined;
  // }

  return appReducer(state, action);
};

export default rootReducer;
