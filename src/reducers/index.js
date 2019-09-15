import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import Auth from "./Auth";
import Category  from "./Category";
import Department  from "./Department";
import MyFiles from './MyFiles';

import { createBrowserHistory } from "history";

const history = createBrowserHistory();
const appReducer = combineReducers({
  router: connectRouter(history),
  auth: Auth,
  category: Category,
  department: Department,
  myfiles: MyFiles
});

const rootReducer = (state, action) => {
  // if (action && action.type === SIGNOUT_USER_SUCCESS) {
  //   state = undefined;
  // }

  return appReducer(state, action);
};

export default rootReducer;
