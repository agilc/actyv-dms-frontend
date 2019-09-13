import React from "react";
import { Paper, Button} from "@material-ui/core";

import FileUpload from 'components/Dialogs/FileUpload';
import CreateFolder from "components/Dialogs/CreateFolder";

class MyFiles extends React.Component {
  constructor() {
    super();
    this.state = {
      fileUploadDialog: false,
      createFolderDialog: false
    }
  }

  handleDialogCloseClose = (type) => {
    if(type === "file_upload"){
      this.setState({fileUploadDialog: false});
    }
    else{
      this.setState({createFolderDialog: false});
    }
  }

  render() {
    return(
      <div className="mt-4">
        <div className="module-main-content">
          <Paper className="h-100">
            <div className="d-flex justify-content-end p-3 container-button-wrapper">
              <Button
                variant="contained"
                color="primary"
                className="mr-2"
                onClick={() => { this.setState({fileUploadDialog: true}); }}
              >
                Upload
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="mr-2"
                onClick={() => { this.setState({createFolderDialog: true}); }}
              >
                New Folder
              </Button>
            </div>
            <div className="p-3">
              
              <span>My Files</span>
            </div>
          </Paper>
        </div>
        {
          this.state.fileUploadDialog && 
          <FileUpload
            handleClose={()=> this.handleDialogCloseClose("file_upload")}
          />
        }
        {
          this.state.createFolderDialog && 
          <CreateFolder
            handleClose={()=> this.handleDialogCloseClose("new_folder")}
          />
        }
      </div>
    )
  }
}
export default MyFiles;