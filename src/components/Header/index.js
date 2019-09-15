import React from "react";
import { connect } from "react-redux";

import AppBar from "@material-ui/core/AppBar"
import Avatar from "@material-ui/core/Avatar";
import Toolbar from "@material-ui/core/Toolbar";

import { userSignOut } from 'actions/Auth';

class Header extends React.Component {
  render() {

    let { name, email } = this.props.appUser;
    return(
      <AppBar className="app-main-header">
        <Toolbar className="app-toolbar">
          <div className="d-none d-sm-block">
              <Avatar
                style={{ margin: 10, width: 50, height: 50 }}
                src={this.props.defaultStore && this.props.defaultStore.picture}
              />
          </div>
          <div className="app-notification-menu">
            <div className="user-name">{ name }</div>
            <span className="user-name">{ email }</span>
          </div>
        <ul className="header-notifications list-inline ml-auto"></ul>
          <div className="cursor-pointer" onClick={this.props.userSignOut}>Logout</div>
        </Toolbar>
      </AppBar>
    )
  }
}

const mapStateToProps = ({ auth }) => {

  const { appUser } = auth;

  return {
    appUser
  };
};

export default connect(
    mapStateToProps,
    {
      userSignOut
    }
  )(Header);