import React, { Component } from 'react';
import {
  DialogTitle, 
  DialogActions, 
  DialogContent, 
  TextField,
  Dialog, 
  Button,
  Slide
} from "@material-ui/core";

class CreateFolder extends Component {
  constructor(){
    super();
    this.state={
      name: "",
      description: "",
      submitResult: false
    }
  }

  handleDialogSave = () => {
    this.setState({ submitResult: true });

    if(!this.state.name)
      return;
    let dataObj = {
      name: this.state.name,
      type: "FOLDER",
      container: this.props.container
    }

    this.state.description && (dataObj.description = this.state.description);

    this.props.createFolder(dataObj);
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
              <h4><b>Create Folder</b></h4>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className="col-10">
              <TextField
                id="name"
                label="Folder Name"
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
                margin="normal"
                fullWidth
                className="mt-0"
                required
              />
              {
                this.state.submitResult && 
                !this.state.name && 
                <span className="text-danger">Folder name is mandatory</span>
              }
            </div>
            <div className="col-10">
              <TextField
                id="description"
                label="Folder Description"
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

export default CreateFolder;