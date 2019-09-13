import React from "react";
import { Route, Switch } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar"
import Avatar from "@material-ui/core/Avatar";
import Toolbar from "@material-ui/core/Toolbar";

class Header extends React.Component {
  render() {
    return(
      <AppBar className="app-main-header">
        <Toolbar className="app-toolbar">
        <ul className="header-notifications list-inline ml-auto"></ul>
          <div>
              <span className="app-notification-menu">
                <div className="user-name">Agil C</div>
              </span>
            </div>
          <div className="d-none d-sm-block">
              <Avatar
                style={{ margin: 10, width: 50, height: 50 }}
                src={this.props.defaultStore && this.props.defaultStore.picture}
              />
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}
export default Header;