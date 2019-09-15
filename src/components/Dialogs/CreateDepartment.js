import React, { Component } from 'react';
import {
  DialogTitle, 
  DialogActions, 
  DialogContent, 
  TextField,
  Dialog, 
  Button,
  Slide,
  MenuItem,
  Select,
  InputLabel
} from "@material-ui/core";

class CreateDepartment extends Component {
  constructor(){
    super();
    this.state={
      name: "",
      description: "",
      admins: [],
      users: []
    }
  }

  componentDidMount(){
    if(this.props.editDepartment){
      let { name, description, admins, users } = this.props.editDepartment;
      this.setState({
        name: name,
        description: description,
        admins: admins,
        users: users
      });
    }
  }

  handleDialogSave = () => {
    let dataObj = {
      name: this.state.name,
      description: this.state.description,
      admins: this.state.admins,
      users: this.state.users
    }

    this.props.createDepartment(dataObj);
  }

  handleDialogCancel = () => {
    this.props.handleClose();
  }

  render() {
    let { userList } = this.props;
    return(
      <div>
        <Dialog 
          open={true} 
          TransitionComponent={Slide} 
          onClose={this.handleDialogCancel}
          maxWidth="sm"
          fullWidth={true}
        >
          <DialogTitle className="pb-0">
            <div className="col-10">
              <h4><b>New Department</b></h4>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className="col-10">
              <TextField
                id="name"
                label="Department Name"
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
                margin="normal"
                fullWidth
                className="mt-0"
              />
            </div>
            <div className="col-10">
              <TextField
                id="description"
                label="Department Description"
                value={this.state.description}
                onChange={(e) => this.setState({ description: e.target.value })}
                margin="normal"
                fullWidth
                multiline
                className="mt-0"
              />
            </div>
            <div className="col-10 pt-3">
              <InputLabel htmlFor="name-multiple">Select Admins</InputLabel>
              <Select
                multiple
                value={this.state.admins}
                onChange={ e => this.setState({ admins: e.target.value })}
                fullWidth
              >
                {userList.map(user => (
                  <MenuItem
                    key={user._id}
                    value={user}
                  >
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="col-10 pt-3">
              <InputLabel htmlFor="name-multiple">Select Users</InputLabel>
              <Select
                multiple
                value={this.state.users}
                onChange={ e => this.setState({ users: e.target.value })}
                fullWidth
              >
                {userList.map(user => (
                  <MenuItem
                    key={user._id}
                    value={user}
                  >
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogCancel} className="bg-light text-dark">
              NO
            </Button>
            <Button onClick={this.handleDialogSave} className="bg-dark text-white">
              YES
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default CreateDepartment;