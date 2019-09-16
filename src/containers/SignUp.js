import React from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';

import {
  userSignUp
} from 'actions/Auth';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(
      this.props.authFetchedIndicators.signUp &&
      !prevProps.authFetchedIndicators.signUp
      )
      this.props.history.push('/');
  }

  render() {
    const {
      name,
      email,
      password
    } = this.state;
    const {showMessage, alertMessage} = this.props;
    return (
      <div className="d-flex justify-content-center pt-5">
        <Paper className="col-xl-4 col-lg-6 col-md-6 col-sm-12 p-4">
          <div className="app-login-content">
            <div className="app-login-header mb-4">
              <h3>Register</h3>
            </div>

            <div className="app-login-form">
              <form>
                <fieldset>
                  <TextField
                    label="Name"
                    fullWidth
                    onChange={(event) => this.setState({name: event.target.value})}
                    defaultValue={name}
                    margin="normal"
                  />
                  <TextField
                    label="Email"
                    fullWidth
                    onChange={(event) => this.setState({email: event.target.value})}
                    defaultValue={email}
                    margin="normal"
                  />
                  <TextField
                    type="password"
                    label="Password"
                    fullWidth
                    onChange={(event) => this.setState({password: event.target.value})}
                    defaultValue={password}
                    margin="normal"
                  />

                  <div className="mb-3 d-flex align-items-center justify-content-between">
                    <Button 
                      onClick={() => this.props.userSignUp({email, password, name}) }
                      variant="contained" color="primary"
                    >
                      Register
                    </Button>
                    <div className="d-flex flex-column">
                      <Link to="/signin">
                        Back to Login
                      </Link>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
          {showMessage && Object.keys(alertMessage).length && <span className="text-danger">{alertMessage}</span>}
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({auth}) => {
  const { 
    authUser, 
    authFetchedIndicators,
    alertMessage, 
    showMessage
   } = auth;
  return{
    authUser,
    authFetchedIndicators,
    alertMessage,
    showMessage
  }
};

export default connect(mapStateToProps, {
  userSignUp
})(SignUp);
