import React, { Component } from 'react';
import {
  DialogTitle, 
  DialogActions, 
  DialogContent, 
  TextField,
  Dialog, 
  Button,
  Slide,
  MenuItem
} from "@material-ui/core";

class CreateCategory extends Component {
  constructor(){
    super();
    this.state={
      name: "",
      description: ""
    }
  }

  handleDialogSave = () => {

  }

  handleDialogCancel = () => {
    this.props.handleClose();
  }

  render() {
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
              <h4><b>New Category</b></h4>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className="col-10">
              <TextField
                id="name"
                label="Category Name"
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
                label="Category Description"
                value={this.state.description}
                onChange={(e) => this.setState({ description: e.target.value })}
                margin="normal"
                fullWidth
                multiline
                className="mt-0"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogCancel} className="text-muted">
              NO
            </Button>
            <Button onClick={this.handleDialogSave} className="text-black">
              YES
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default CreateCategory;