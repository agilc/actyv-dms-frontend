import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import MyFiles from 'app/routes/Home/index';
import Header from 'components/Header';

class MainApp extends React.Component {
  render() {
    return(
      <div className="app-container">
        <div className="app-header">
          <Header />
        </div>

        <div className="app-main-content">
          <Switch>
            <Route
                path={`${this.props.match.url}/myfiles`}
                component={MyFiles}
              />
          </Switch>
        </div>
      </div>
    )
  }
}
export default MainApp;