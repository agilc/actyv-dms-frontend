import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
  }
  render() {
    const {
      email,
      password
    } = this.state;
    return (
      <div className="d-flex justify-content-center">
        <Paper className="col-xl-4 col-lg-6 col-md-6 col-sm-12 p-4">
          <div className="app-login-content">
            <div className="app-login-header mb-4">
              <h3>Login</h3>
            </div>

            <div className="app-login-form">
              <form>
                <fieldset>
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
                    defaultValue={email}
                    margin="normal"
                  />

                  <div className="mb-3 d-flex align-items-center justify-content-between">
                    <Button 
                      // onClick={() => {
                      //   this.props.showAuthLoader();
                      //   this.props.userSignIn({email, password});
                      // }} 
                      variant="contained" color="primary"
                    >
                      SignIn
                    </Button>
                    <div className="d-flex flex-column">
                      <Link to="/signup">
                        Sign Up
                      </Link>
                      <Link to="/reset-password">
                        Reset Password
                      </Link>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = ({auth}) => {
  
};

export default connect(mapStateToProps, {
})(SignIn);
