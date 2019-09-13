import React, { Component } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import MainApp from "app/index";
import "assets/styles/index.js";

class App extends Component {
  
  render(){
    const {
      match,
      location,
      authUser,
      initURL,
      isDirectionRTL
    } = this.props;

    if (location.pathname === "/") {
      // if (authUser === null) {
      return <Redirect to={"/app"} />;
      // } else if (initURL === "" || initURL === "/" || initURL === "/signin") {
      //   return <Redirect to={"/app/chatbox"} />;
      // } else {
      //   return <Redirect to={initURL} />;
      // }
    }

    return (
      <div className="app-main">
        <Switch>
          <Route path="/app" component={MainApp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </div>
      );
  }
}

export default App;
