import React from "react";
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import {
    appPasswordReset
  } from 'actions/Auth';

class ResetPassword extends React.Component {
	constructor() {
    super();
    this.state = {
      email: ''
    }
  }
    render(){
        return(
					<div className="d-flex justify-content-center pt-5">
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
													defaultValue={this.state.email}
													margin="normal"
													className="mt-1 my-sm-3"
											/>
											<div className="mb-3 d-flex align-items-center justify-content-between">
												<Button 
													onClick={() => {
														this.props.appPasswordReset(this.state.email);
													}} 
													variant="contained" 
													color="primary"
												>
													Request Reset Link
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
						</Paper>
					</div>
        )
    }
}
const mapStateToProps = ({auth}) => {
    const {loader, alertMessage, showMessage, authUser} = auth;
    return {loader, alertMessage, showMessage, authUser}
  };
  
  export default connect(mapStateToProps, {
    appPasswordReset
  })(ResetPassword);