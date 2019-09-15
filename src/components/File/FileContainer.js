import React from "react";
import { Paper, Button} from "@material-ui/core";
import { connect } from "react-redux";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import FileUpload from 'components/Dialogs/FileUpload';
import CreateFolder from "components/Dialogs/CreateFolder";
import FileDetails from 'components/File/FileDetails';
import ConfirmationDialog from 'components/Dialogs/ConfirmationDialog';

import { 
  createFileFolder,
  listFileFolder,
  deleteFileFolder
} from 'actions/MyFiles';

import { checkOutFile, checkInFile } from 'actions/Department';
import { listCategories  } from 'actions/Category';

class FileContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      fileUploadDialog: false,
      createFolderDialog: false,
      selectedFolderArray: [],
      selectedFile: null,
      menuAnchorElement: null,
      contextMenuOpen: false,
      contextMenuSelectedItem: null,
      deleteConfirmation: false,
      container: null,
      containerId: null,
      category: null,
      fileUploadType: null,
      fileUploadDetails: null
    }
  }
  
  componentDidMount() {
    this.setState({
      container: this.props.container,
      containerId: this.props.containerId,
      category: this.props.category
    })

    this.props.listCategories();
  }

  componentDidUpdate(prevProps, prevState){
    if(!prevState.container && this.state.container){
      let dataObj = {
        container: this.state.container
      }
      this.state.containerId && (dataObj.containerId = this.state.containerId);
      this.props.listFileFolder(dataObj);
    }
    
    if(!prevState.category && this.state.category){
      let dataObj = {
        category: this.state.category
      }
      this.props.listFileFolder(dataObj);
    }

    if(
      (!prevProps.myfilesFetchedIndicators.deleteFileFolder &&
      this.props.myfilesFetchedIndicators.deleteFileFolder) ||
      (!prevProps.myfilesFetchedIndicators.createFileFolder &&
      this.props.myfilesFetchedIndicators.createFileFolder)
      )
    {
      let dataObj = {
        parentId: this.state.selectedFolderArray[this.state.selectedFolderArray.length-1]
      }

      this.state.container && (dataObj.container = this.state.container);
      this.state.containerId && (dataObj.containerId = this.state.containerId);
      this.state.category && (dataObj.containerId = this.state.category);
      this.props.listFileFolder(dataObj);
    }

    if(
      (!prevProps.departmentFetchData.fileCheckIn &&
      this.props.departmentFetchData.fileCheckIn) ||
      (!prevProps.departmentFetchData.fileCheckOut &&
      this.props.departmentFetchData.fileCheckOut)
      )
    {
      let dataObj = {
        container: this.state.container
      }
      this.state.containerId && (dataObj.containerId = this.state.containerId);
      this.props.listFileFolder(dataObj);
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

  createFolder = (data) => {
    let { selectedFolderArray } = this.state;
    if(selectedFolderArray.length > 0){
      let parentFolder = selectedFolderArray[selectedFolderArray.length -1 ];
      data.parentId = parentFolder._id;
    }

    this.state.containerId && (data.containerId = this.state.containerId);
    this.props.createFileFolder(data);
    this.handleDialogCloseClose("new_folder");
  }

  saveFile = (data) => {
    let { selectedFolderArray } = this.state;
    if(selectedFolderArray.length > 0){
      let parentFolder = selectedFolderArray[selectedFolderArray.length -1 ];
      data.parentId = parentFolder._id;
    }

    this.state.containerId && (data.containerId = this.state.containerId);
    this.props.createFileFolder(data);
    this.handleDialogCloseClose("file_upload");
  }

  selectFileFolder = (item) => {
    if(item.type === "FOLDER"){
      let folderArray = this.state.selectedFolderArray;
      folderArray.push(item);
      this.setState({ selectedFolderArray: folderArray });
      let dataObj = {
        parentId: item._id
      }

      this.state.container && (dataObj.container = this.state.container);
      this.state.containerId && (dataObj.containerId = this.state.containerId);
      this.state.category && (dataObj.category = this.state.category);
      this.props.listFileFolder(dataObj);
    }
    else{
      this.setState({ selectedFile: item });
    }
    this.onContextMenuClose();
  }

  onCotextMenuOpen = (event, item) => {
    event.preventDefault();
    this.setState({ 
      menuAnchorElement: event.currentTarget,
      contextMenuOpen: true,
      contextMenuSelectedItem: item
    });
  }

  onContextMenuClose = () => {
    this.setState({ 
      menuAnchorElement: null,
      contextMenuOpen: false,
      contextMenuSelectedItem: null
    });
  }

  deleteFileFolderConfirmation = () => {
    let data = {
      id: this.state.contextMenuSelectedItem._id
    };
    this.setState({ 
      dialogSuccessData: data,
      deleteConfirmation: true
    });
  }

  deleteFileFolder = (data) => {
    this.props.deleteFileFolder(data);
    this.setState({ deleteConfirmation: false });
    this.onContextMenuClose();
  }

  deleteFileFolderCancel = () =>{
    this.setState({ deleteConfirmation: false });
  }

  checkOutFile = () => {
    this.props.checkOutFile(this.state.contextMenuSelectedItem._id);
    this.onContextMenuClose();
  }

  checkInFileDialog = () => {
    this.setState({
      fileUploadType: "CHECKIN",
      fileUploadDetails: this.state.contextMenuSelectedItem,
      fileUploadDialog: true
    });
    this.onContextMenuClose();
  }

  checkInFile = data => {
    data.updatedBy = this.props.appUser;
    this.props.checkInFile(data);
    this.setState({
      fileUploadType: null,
      fileUploadDetails: null,
      fileUploadDialog: false
    });
  }

  getFileFolder = (item) => {
    return(
      <div 
        className={`${item.type === "FILE" && item.url && "pt-2"} col-1 file-list-parent d-flex flex-column`} key={item._id}
        onClick={() => this.selectFileFolder(item)}
        onContextMenu={(event) => this.onCotextMenuOpen(event,item)}
      >
        {
          item.type === "FOLDER" ? 
            <i className={`zmdi zmdi-folder file-item`}></i>
          : item.url ? 
            <img className="image-item" src={item.url}></img>
          : <i className={`zmdi zmdi-file file-item`}></i>
        }
        {
          item.checkoutStatus === 1 ? <i class="zmdi zmdi-lock-outline file-lock"></i> : ""
        }
        <span>{item.name}</span>
      </div>
    )
  }

  fileListSection = () => {
    let { contextMenuSelectedItem, menuAnchorElement, contextMenuOpen} = this.state;
    return (
      <React.Fragment>
        <Menu
          anchorEl={menuAnchorElement}
          open={contextMenuOpen}
          onClose={this.onContextMenuClose}
        >
          <MenuItem onClick={() => this.selectFileFolder(contextMenuSelectedItem)}>Open</MenuItem>
          <MenuItem onClick={this.deleteFileFolderConfirmation}>Delete</MenuItem>
          {
            contextMenuSelectedItem && 
            contextMenuSelectedItem.type === "FILE" && 
            contextMenuSelectedItem.checkoutStatus === 0 && 
            <MenuItem onClick={this.checkOutFile}>CheckOut</MenuItem>
          }
          {
            contextMenuSelectedItem && 
            contextMenuSelectedItem.type === "FILE" && 
            contextMenuSelectedItem.checkoutStatus === 1 && 
            <MenuItem onClick={this.checkInFileDialog}>CheckIn</MenuItem>
          }
          </Menu>
        <div className="d-flex file-list-wrapper bg-white">
          {
            this.props.fileFolderList && this.props.fileFolderList.map(item =>  this.getFileFolder(item) )
          }
        </div>
      </React.Fragment>
    )
  }

  navigateBack = () => {
    if(this.state.selectedFile){
      this.setState({ selectedFile: null })
    }
    else{
      this.state.selectedFolderArray.pop();
      let dataObj = {
        parentId: this.state.selectedFolderArray[this.state.selectedFolderArray.length-1]
      }

      this.state.container && (dataObj.container = this.state.container);
      this.state.containerId && (dataObj.containerId = this.state.containerId);
      this.state.category && (dataObj.category = this.state.category);
      this.props.listFileFolder(dataObj);
    }
  }

  render() {
    return(
      <div>
        <div className="module-main-content mt-4">
          <Paper className="d-flex container-button-wrapper">
            <div className="breadcrumb-wrapper flex-grow-2 d-flex">
              {
                ( this.state.selectedFolderArray.length > 0 || this.state.selectedFile ) &&
                <i className="zmdi zmdi-arrow-left" onClick={this.navigateBack}></i>
              }
              {
                this.state.selectedFolderArray.map(item => <h6 key={item._id}>{`${item.name}/`}</h6> )
              }
            </div>
            {
              !this.state.selectedFile && !this.state.category &&
              <div className="d-flex justify-content-end px-3 pt-3 container-button-wrapper flex-grow-1 pb-3">
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
            }
            {
              this.state.selectedFile &&
              <div className="d-flex justify-content-end px-3 pt-3 container-button-wrapper flex-grow-1 pb-3">
                <Button
                  variant="contained"
                  color="primary"
                  className="mr-2"
                  onClick={() => { this.setState({fileUploadDialog: true}); }}
                >
                  Save
                </Button>
              </div>
            }
          </Paper>
          {
            !this.state.selectedFile ? 
              this.fileListSection() 
              : <FileDetails 
                  file={this.state.selectedFile}
                />
          }
    
        </div>
        {
          this.state.fileUploadDialog && 
          <FileUpload
            handleClose={()=> this.handleDialogCloseClose("file_upload")}
            saveFile={this.saveFile}
            container={ this.state.container }
            categoryList={ this.props.categoryList }
            type={this.state.fileUploadType}
            fileDetails={this.state.fileUploadDetails}
            checkInFile={this.checkInFile}
          />
        }
        {
          this.state.createFolderDialog && 
          <CreateFolder
            handleClose={()=> this.handleDialogCloseClose("new_folder")}
            createFolder={this.createFolder}
            container= { this.state.container }
          />
        }
        <ConfirmationDialog
          open = {this.state.deleteConfirmation}
          heading = "Are you sure ?"
          body = "Do you want to delete"
          successFunction = { () => this.deleteFileFolder(this.state.dialogSuccessData) }
          errorFunction = { () => this.deleteFileFolderCancel()}
          successData = {this.state.dialogSuccessData }
        />
      </div>
    )
  }

}

const mapStateToProps = ({ auth, myfiles, category, department }) => {
  const { appUser } = auth;
  const { categoryList } = category;
  const { departmentFetchData } = department;
  const { 
    fileFolderList,
    myfilesFetchingIndicators,
    myfilesFetchedIndicators
   } = myfiles;

  return {
    appUser,
    fileFolderList,
    myfilesFetchingIndicators,
    myfilesFetchedIndicators,
    categoryList,
    departmentFetchData
  };
};

export default connect(
  mapStateToProps,
  {
    createFileFolder,
    listFileFolder,
    deleteFileFolder,
    listCategories,
    checkOutFile,
    checkInFile
  }
)(FileContainer);