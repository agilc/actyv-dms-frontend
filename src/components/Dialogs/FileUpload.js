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

class FileUpload extends Component {
  constructor(){
    super();
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
              <h4><b>Upload File</b></h4>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className="col-10">
              <TextField
                id="name"
                label="Name"
                // value={this.state.name}
                // onChange={(e) => this.setState({ name: e.target.value })}
                margin="normal"
                fullWidth
                className="mt-0"
              />
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

export default FileUpload;