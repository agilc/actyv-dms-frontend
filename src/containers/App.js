import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ResetPassword from "./ResetPassword";
import MainApp from "app/index";
import { setInitUrl } from "../actions/Auth";
import "assets/styles/index.js";

const RestrictedRoute = ({ component: Component, authUser, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authUser ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends Component {

  componentDidMount() {
    if (this.props.initURL === "") {
      this.props.setInitUrl(this.props.history.location.pathname);
    }
  }
  
  render(){
    const {
      match,
      location,
      authUser,
      initURL
    } = this.props;

    if (location.pathname === "/") {
      if (authUser === null) {
      return <Redirect to={"/signin"} />;
      } else if (initURL === "" || initURL === "/" || initURL === "/signin") {
        return <Redirect to={"/app/myfiles"} />;
      } else {
        return <Redirect to={initURL} />;
      }
    }

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="app-main">
          <Switch>
            <RestrictedRoute
                path={`${match.url}app`}
                authUser={authUser}
                component={MainApp}
              />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/reset-password" component={ResetPassword} />
          </Switch>
        </div>
      </MuiPickersUtilsProvider>
      );
  }
}

const mapStateToProps = ({ auth }) => {

  const { authUser, initURL,appUser } = auth;
  return {
    authUser,
    initURL,
    appUser
  };
};

export default connect(
  mapStateToProps,
  { 
    setInitUrl
  }
)(App);
