import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

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
      initURL,
      isDirectionRTL
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
      );
  }
}

const mapStateToProps = ({ auth }) => {

  const { authUser, initURL } = auth;
  return {
    authUser,
    initURL
  };
};

export default connect(
  mapStateToProps,
  { 
    setInitUrl
  }
)(App);
