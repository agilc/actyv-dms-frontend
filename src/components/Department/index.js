import React from "react";
import { Paper, Button} from "@material-ui/core";

import FileUpload from 'components/Dialogs/FileUpload';
import CreateFolder from "components/Dialogs/CreateFolder";
import CreateDepartment from "components/Dialogs/CreateDepartment";

class Department extends React.Component {
  constructor() {
    super();
    this.state = {
      fileUploadDialog: false,
      createFolderDialog: false,
      createDepartmentDialog: false
    }
  }

  handleDialogCloseClose = (type) => {
    if(type === "file_upload"){
      this.setState({fileUploadDialog: false});
    }
    else if(type === "new_folder"){
      this.setState({createFolderDialog: false});
    }
    else{
      this.setState({createDepartmentDialog: false});
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
              <Button
                variant="contained"
                color="primary"
                className="mr-2"
                onClick={() => { this.setState({createDepartmentDialog: true}); }}
              >
                New Department
              </Button>
            </div>
            <div className="p-3">
              <span>Department</span>
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
        {
          this.state.createDepartmentDialog && 
          <CreateDepartment
            handleClose={()=> this.handleDialogCloseClose("new_dept")}
          />
        }
      </div>
    )
  }
}
export default Department;