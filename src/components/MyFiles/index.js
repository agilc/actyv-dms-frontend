import React from "react";

import FileContainer from 'components/File/FileContainer';

class MyFiles extends React.Component {

  // componentDidMount() {
  //   let dataObj = {
  //     container: "MYFILES"
  //   }
  //   this.props.listFileFolder(dataObj);
  //   this.props.listCategories();
  // }

  // componentDidUpdate(prevProps, prevState){
  //   if(
  //     (!prevProps.myfilesFetchedIndicators.deleteFileFolder &&
  //     this.props.myfilesFetchedIndicators.deleteFileFolder) ||
  //     (!prevProps.myfilesFetchedIndicators.createFileFolder &&
  //     this.props.myfilesFetchedIndicators.createFileFolder)
  //     )
  //   {
  //     let dataObj = {
  //       container: "MYFILES",
  //       parentId: this.state.selectedFolderArray[this.state.selectedFolderArray.length-1]
  //     }
  //     this.props.listFileFolder(dataObj);
  //   }
  // }

  // handleDialogCloseClose = (type) => {
  //   if(type === "file_upload"){
  //     this.setState({fileUploadDialog: false});
  //   }
  //   else{
  //     this.setState({createFolderDialog: false});
  //   }
  // }

  // createFolder = (data) => {
  //   let { selectedFolderArray } = this.state;
  //   if(selectedFolderArray.length > 0){
  //     let parentFolder = selectedFolderArray[selectedFolderArray.length -1 ];
  //     data.parentId = parentFolder._id;
  //   }

  //   this.props.createFileFolder(data);
  //   this.handleDialogCloseClose("new_folder");
  // }

  // saveFile = (data) => {
  //   let { selectedFolderArray } = this.state;
  //   if(selectedFolderArray.length > 0){
  //     let parentFolder = selectedFolderArray[selectedFolderArray.length -1 ];
  //     data.parentId = parentFolder._id;
  //   }

  //   this.props.createFileFolder(data);
  //   this.handleDialogCloseClose("file_upload");
  // }

  // selectFileFolder = (item) => {
  //   if(item.type === "FOLDER"){
  //     let folderArray = this.state.selectedFolderArray;
  //     folderArray.push(item);
  //     this.setState({ selectedFolderArray: folderArray });
  //     let dataObj = {
  //       container: "MYFILES",
  //       parentId: item._id
  //     }
  //     this.props.listFileFolder(dataObj);
  //   }
  //   else{
  //     this.setState({ selectedFile: item });
  //   }
  //   this.onContextMenuClose();
  // }

  // onCotextMenuOpen = (event, item) => {
  //   event.preventDefault();
  //   this.setState({ 
  //     menuAnchorElement: event.currentTarget,
  //     contextMenuOpen: true,
  //     contextMenuSelectedItem: item
  //   });
  // }

  // onContextMenuClose = () => {
  //   this.setState({ 
  //     menuAnchorElement: null,
  //     contextMenuOpen: false,
  //     contextMenuSelectedItem: null
  //   });
  // }

  // deleteFileFolderConfirmation = () => {
  //   let data = {
  //     id: this.state.contextMenuSelectedItem._id
  //   };
  //   this.setState({ 
  //     dialogSuccessData: data,
  //     deleteConfirmation: true
  //   });
  // }

  // deleteFileFolder = (data) => {
  //   this.props.deleteFileFolder(data);
  //   this.setState({ deleteConfirmation: false });
  //   this.onContextMenuClose();
  // }

  // deleteFileFolderCancel = () =>{
  //   this.setState({ deleteConfirmation: false });
  // }

  // getFileFolder = (item) => {
  //   return(
  //     <div 
  //       className={`${item.type === "FILE" && item.url && "pt-2"} col-1 file-list-parent`} key={item._id}
  //       onClick={() => this.selectFileFolder(item)}
  //       onContextMenu={(event) => this.onCotextMenuOpen(event,item)}
  //     >
  //       {
  //         item.type === "FOLDER" ? 
  //           <i className={`zmdi zmdi-folder file-item`}></i>
  //         : item.url ? 
  //           <img className="image-item" src={item.url}></img>
  //         : <i className={`zmdi zmdi-file file-item`}></i>
  //       }
  //       <span>{item.name}</span>
  //     </div>
  //   )
  // }

  // fileListSection = () => {
  //   return (
  //     <React.Fragment>
  //       <Menu
  //         anchorEl={this.state.menuAnchorElement}
  //         open={this.state.contextMenuOpen}
  //         onClose={this.onContextMenuClose}
  //       >
  //         <MenuItem onClick={() => this.selectFileFolder(this.state.contextMenuSelectedItem)}>Open</MenuItem>
  //         <MenuItem onClick={this.deleteFileFolderConfirmation}>Delete</MenuItem>
  //       </Menu>
  //       <div className="d-flex file-list-wrapper bg-white">
  //         {
  //           this.props.fileFolderList && this.props.fileFolderList.map(item =>  this.getFileFolder(item) )
  //         }
  //       </div>
  //     </React.Fragment>
  //   )
  // }

  // navigateBack = () => {
  //   if(this.state.selectedFile){
  //     this.setState({ selectedFile: null })
  //   }
  //   else{
  //     this.state.selectedFolderArray.pop();
  //     let dataObj = {
  //       container: "MYFILES",
  //       parentId: this.state.selectedFolderArray[this.state.selectedFolderArray.length-1]
  //     }
  //     this.props.listFileFolder(dataObj);
  //   }
  // }
 
  render() {
    return(
      <FileContainer
        container="MYFILES"
      />
      // <div>
      //   <div className="module-main-content mt-4">
      //     <Paper className="d-flex container-button-wrapper">
      //       <div className="breadcrumb-wrapper flex-grow-2 d-flex">
      //         {
      //           ( this.state.selectedFolderArray.length > 0 || this.state.selectedFile ) &&
      //           <i className="zmdi zmdi-arrow-left" onClick={this.navigateBack}></i>
      //         }
      //         {
      //           this.state.selectedFolderArray.map(item => <h6 key={item._id}>{`${item.name}/`}</h6> )
      //         }
      //       </div>
      //       {
      //         !this.state.selectedFile ?
      //         <div className="d-flex justify-content-end px-3 pt-3 container-button-wrapper flex-grow-1 pb-3">
      //           <Button
      //             variant="contained"
      //             color="primary"
      //             className="mr-2"
      //             onClick={() => { this.setState({fileUploadDialog: true}); }}
      //           >
      //             Upload
      //           </Button>
      //           <Button
      //             variant="contained"
      //             color="primary"
      //             className="mr-2"
      //             onClick={() => { this.setState({createFolderDialog: true}); }}
      //           >
      //             New Folder
      //           </Button>
      //         </div>
      //         :
      //         <div className="d-flex justify-content-end px-3 pt-3 container-button-wrapper flex-grow-1 pb-3">
      //           <Button
      //             variant="contained"
      //             color="primary"
      //             className="mr-2"
      //             onClick={() => { this.setState({fileUploadDialog: true}); }}
      //           >
      //             Save
      //           </Button>
      //         </div>
      //       }
      //     </Paper>
      //     {
      //       !this.state.selectedFile ? 
      //         this.fileListSection() 
      //         : <FileDetails 
      //             file={this.state.selectedFile}
      //           />
      //     }
    
      //   </div>
      //   {
      //     this.state.fileUploadDialog && 
      //     <FileUpload
      //       handleClose={()=> this.handleDialogCloseClose("file_upload")}
      //       saveFile={this.saveFile}
      //       container="MYFILES"
      //       categoryList={ this.props.categoryList }
      //     />
      //   }
      //   {
      //     this.state.createFolderDialog && 
      //     <CreateFolder
      //       handleClose={()=> this.handleDialogCloseClose("new_folder")}
      //       createFolder={this.createFolder}
      //       container="MYFILES"
      //     />
      //   }
      //   <ConfirmationDialog
      //     open = {this.state.deleteConfirmation}
      //     heading = "Are you sure ?"
      //     body = "Do you want to delete"
      //     successFunction = { () => this.deleteFileFolder(this.state.dialogSuccessData) }
      //     errorFunction = { () => this.deleteFileFolderCancel()}
      //     successData = {this.state.dialogSuccessData }
      //   />
      // </div>
    )
  }
}
export default MyFiles;